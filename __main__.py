"Main module"
import logging
from sys import stderr
import tornado.ioloop
import tornado.web
from jsonrpc import JSONRPCResponseManager, dispatcher

import views

PORT = 8888


class Default(tornado.web.RequestHandler):
    def get(self):
        self.write("Listening for JSON-RPC requests...")


class JSONRPCHandler(tornado.web.RequestHandler):
    def post(self):
        dispatcher['packages'] = views.packages
        dispatcher['depgraph'] = views.depgraph
        result = JSONRPCResponseManager.handle(self.request.body, dispatcher)
        self.write(result.data)


def add_logger(name):
    file_handler = logging.FileHandler(f"{name}.log")
    file_logger = logging.getLogger(f"tornado.{name}")
    file_logger.setLevel(logging.DEBUG)
    file_logger.addHandler(file_handler)

    stderr_handler = logging.StreamHandler(stderr)
    stderr_logger = logging.getLogger(f"tornado.{name}")
    stderr_logger.setLevel(logging.DEBUG)
    stderr_logger.addHandler(stderr_handler)


if __name__ == "__main__":
    add_logger("access")
    add_logger("application")
    add_logger("general")

    ROUTES = [
        (r"/", Default),
        (r"/api/json-rpc", JSONRPCHandler),
    ]
    tornado.web.Application(ROUTES, debug=True).listen(PORT)
    print(f"running at {PORT}")
    tornado.ioloop.IOLoop.current().start()
