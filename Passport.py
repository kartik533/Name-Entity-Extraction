# Import PassportEye
from passporteye import read_mrz
import sys
import json

# Process image

path = sys.argv[1]
prefix = r"C:\\Users\\1605600\\Desktop\\Passports\\"
final = prefix + path
mrz = read_mrz(final)

# Obtain image
mrz_data = mrz.to_dict()
mrz_json=json.dumps(mrz_data)
print(mrz_json)