import can
import cantools

# Run in terminal to decode sent Msg
#
# candump vcan0 | python3 -m cantools decode '/home/cbvs/Desktop/dbcFile.dbc'

bus = can.interface.Bus(bustype='socketcan', channel='vcan0', bitrate=250000)
dbc = cantools.database.load_file('/home/cbvs/Desktop/dbcFile.dbc')

msg = dbc.get_message_by_frame_id(419364094)
msg_data = msg.encode({
    'WasherFluidLevel': 60,
    'FuelLevel1': 8.0,
    'EngnFlFltrDffrntlPrssr': 200,
    'EngnOlFltrDffrntlPrssr': 20,
    'CargoAmbientTemperature': 85,
    'FuelLevel2': 55,
    'EngnOlFltrDffrntlPrssrExtnddRng': 400})
    
msg = can.Message(arbitration_id = 2566847742, data = msg_data, is_extended_id = False)
bus.send(msg)