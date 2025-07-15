from AppFactory import app, socketio
from flask_socketio import emit
from ClientHelper import clients
@socketio.on("combat_prep")
def combat_prep():
    print('worked')


@socketio.on("add_players_to_combat")
def add_players_to_combat():
    print(clients)
    emit("return_players_for_combat", {"clients": clients})
