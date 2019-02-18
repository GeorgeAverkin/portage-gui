import itertools
from gentoolkit.query import Query

QUERY_OPTS = {
    "duplicates": False,
    "in_porttree": False,
    "in_overlay": False,
    "include_mask_reason": False,
    "is_regex": False,
    "show_progress": False,
    "package_format": None,
    "binpkgs-missing": False
}


def packages(*params):
    query_str = next(iter(params), '*')
    query = Query(query_str)
    matches = query.smart_find(**QUERY_OPTS)

    _packages = [{
        "deps": x.deps.get_all_depends(),
        "category": x.category,
        "name": x.name,
        "revision": x.revision,
        "size": x.size()[0],
        "files": x.size()[1],
        "uncounted_files": x.size()[2],
        "use": x.use().split(" "),
        "active_use": x.use_status(),
        "version": x.version,
    } for x in matches]

    return _packages


def depgraph(query_str):
    query = Query(query_str)
    package = query.find_best()
    if not package:
        return
    orphans = []
    targets = list({x.cp for x in package.deps.get_all_depends()})
    deplist = [{"source": package.cp, "targets": targets}]

    while True:
        targets = list(set(itertools.chain(*[x["targets"] for x in deplist])))
        sources = [x["source"] for x in deplist]
        sources_to_add = [x for x in targets if x not in sources]
        if not sources_to_add:
            break
        else:
            for cp in sources_to_add:
                query = Query(cp)
                package = query.find_best()
                if package is None:
                    orphans.append(cp)
                    deplist.append({
                        "source": cp,
                        "targets": [],
                    })
                else:
                    deplist.append({
                        "source": package.cp,
                        "targets": list({x.cp for x in package.deps.get_all_depends()}),
                    })
    return {"deplist": deplist, "orphans": orphans}
