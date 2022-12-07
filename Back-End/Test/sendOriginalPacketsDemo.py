from time import sleep
import can,cantools,re

# Run in terminal to decode sent Msg
#
# candump vcan0 | python3 -m cantools decode '/home/kali/Desktop/CanBusTester/CS4311_CANBusVisualizer_Team_6/Back-End/CSS-Electronics-SAE-J1939-2018-08_v1.2.dbc'

bus = can.interface.Bus(bustype='socketcan', channel='vcan0', bitrate=250000)
dbc = cantools.database.load_file('/home/cbvs/Desktop/dbcFile.dbc')

# Hardcode

# msg = dbc.get_message_by_frame_id(419364094)
# msg_data = msg.encode({
#     'WasherFluidLevel': 60,
#     'FuelLevel1': 8.0,
#     'EngnFlFltrDffrntlPrssr': 200,
#     'EngnOlFltrDffrntlPrssr': 20,
#     'CargoAmbientTemperature': 85,
#     'FuelLevel2': 55,
#     'EngnOlFltrDffrntlPrssrExtnddRng': 400})
    
# # final = can.Message(arbitration_id = 2566847742, data = msg_data, is_extended_id = False)

s = list(line.strip() for line in open('/home/cbvs/Desktop/CS4311_CANBusVisualizer_Team_6/Back-End/Test/OriginalPackets.log'))

for p in range(len(s)):
        sleep(0.1)
        try:
            packet = re.split(' |#|\n',s[p])
            id = int(packet[2], 16) + 254
            msg = dbc.get_message_by_frame_id(id)
            b = bytes(packet[3], 'utf-8')
            db = dbc.decode_message(id, b)
            msg_data = msg.encode(db)
            
            t = packet[0][1:-1]
            final = can.Message(timestamp = float(t), arbitration_id = id+2147483648, data = msg_data, is_extended_id = False) 
            bus.send(final)
            print(" Packet #:",p, end='\r')
        except:
            i = 1
    