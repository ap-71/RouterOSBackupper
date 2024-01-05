from utils import Path, MikrotikDevice


md = MikrotikDevice(
    name='core',
    ip='',
    username='',
    password=''
)
md.backup(path=Path(dir_='files/2023/12/24', file=md.name+".rsc"))
