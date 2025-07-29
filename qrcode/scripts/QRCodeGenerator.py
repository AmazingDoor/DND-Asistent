import qrcode
import os


def make_code(data: str, error_correction='high', out_border: int=1):
    match error_correction.lower():
        case 4 | 'high' | 'h':
            correction = qrcode.constants.ERROR_CORRECT_H
        case 3 | 'quality' 'q':
            correction = qrcode.constants.ERROR_CORRECT_Q
        case 2 | 'medium' | 'm':
            correction = qrcode.constants.ERROR_CORRECT_M
        case 1 | 'low' | 'l':
            correction = qrcode.constants.ERROR_CORRECT_L
        case _:
            correction = qrcode.constants.ERROR_CORRECT_L

    code = qrcode.QRCode(
        error_correction=correction,  # High error correction
        border=out_border,  # Adjust border
    )

    # Add data and make the QR code
    code.add_data(data)
    code.make(fit=True)
    return code

def save_image(code, file_name: str="QRcode_default", datatype: str=".jpeg", location: str="\\qrcode\\images"):
    path = os.getcwd()
    print(path)
    img = code.make_image(fill_color="black", back_color="white")
    img.save(path + location + "\\" + file_name + datatype)

