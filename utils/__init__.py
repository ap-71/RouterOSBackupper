from abc import abstractmethod
import os
import socket
from datetime import datetime

from netmiko import ConnectHandler

class Path:
    def __init__(self, dir_, file) -> None:
        self.dir = dir_
        self.file = file
        
        self.make_dirs()
        
    def make_dirs(self):
        os.makedirs(self.dir, exist_ok=True)
    
    def read(self):
        with open(self.full_path, 'r') as file:
            return file.read()
    
    def write(self, data):
        with open(self.full_path, 'w') as file:
            return file.write(data)
        
    @property
    def full_path(self):
        return os.path.join(self.dir, self.file)

def check(address, port):
    is_open = False
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    
    try:
        result = sock.connect_ex((address, port))
        is_open = result == 0
    except Exception as e:
        pass
    finally:
        sock.close()
    
    return is_open

class Proto:
    def __init__(self, name, port, protocol='TCP') -> None:
        self.name = name
        self.port = port
        self.protocol = 'TCP'


class SSHProto(Proto):
    def __init__(self, port=22) -> None:
        super().__init__(name='SSH', port=port)

    def check(self, address) -> bool: 
        return check(address=address, port=self.port), datetime.now()
        
        
class Device:
    def __init__(
        self, 
        name: str, 
        ip: str, 
        proto: Proto, 
        username, 
        password, 
        device_type,
        desription="",
    ) -> None:
        self.name = name
        self.desription = desription
        self.ip = ip
        self.proto = proto
        self._config = {
            'device_type': device_type,
            'host': ip,
            'username': username,
            'password': password,
            'port': proto.port,
        }
    
    @abstractmethod
    def connect(self):
        pass
    
    @abstractmethod
    def backup(self, path: Path):
        pass
    
    
class MikrotikDevice(Device):
    def __init__(self, name: str, ip: str, username, password, proto: SSHProto = SSHProto(), desription="mikrotik") -> None:
        super().__init__(
            name=name, 
            ip=ip, 
            proto=proto, 
            desription=desription, 
            username=username, 
            password=password,
            device_type="mikrotik_routeros"
        )
        
    def connect(self):
        with ConnectHandler(**self._config) as conn:
            yield conn
    
    def backup(self, path: Path):
        for conn in self.connect():
            output = conn.send_command_timing('/export')
            path.write(output)
