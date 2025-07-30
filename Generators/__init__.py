import os
import socket
import qrcode

# use this if you would like an image.
#just a quick function to get an image file rather than go through two functions every time.
def get_QR_image(data: str, error_correction='high', out_border: int=1):
    #creates the code from the data
    code = create_code(data, error_correction=error_correction, out_border=out_border)
    # creates the image
    image = create_QR_image(code)
    return image
# Making the QR code
def create_code(data: str, error_correction='high', out_border: int=1):
    # checks the error correction given, pretty self-explanatory
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
    # takes the error correction and border size and crates the base of the QR code
    code = qrcode.QRCode(
        error_correction=correction,  # High error correction
        border=out_border  # Adjust border
    )

    # Add data and make the QR code
    code.add_data(data)
    code.make(fit=True)
    return code

# converts the QR code into the Image
def create_QR_image(code):
    image = code.make_image(fill_color="black", back_color="white")
    return image

#takes a QR code and other information to save it as an image file
def save_image(image, file_name: str="QRcode_default", datatype: str=".jpeg", location: str="\\qrcode_Images"):
    # gets the path of the current file structure
    path = os.getcwd()
    # Saves the QR code as an image
    try:
        image.save(path + location + "\\" + file_name + datatype)
        return True
    except:
        return False

# custom
def connect_IP(location: str="home",ip: str=socket.get_ip_address(), file_name: str="generated_IP"):
    try:
        image = create_QR_image("http/" + ip + '/' + location)
        return save_image(image, file_name=file_name)
    except:
        return False


def get_ip_address():
    try:
        # Get the hostname of your machine
        hostname = socket.gethostname()
        # Resolve the hostname to an IP address
        ip_address = socket.gethostbyname(hostname)
        return ip_address
    except socket.gaierror:
        # Handle cases where hostname resolution fails
        return ""