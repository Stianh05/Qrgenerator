import os
import qrcode

def delete_old_qr_code():
    if os.path.exists("qr_code.png"):
        os.remove("qr_code.png")

def generate_qr_code(item_id):
    delete_old_qr_code()
    website_url = "https://stianh05.github.io/Qrgenerator/?id="
    qr_data = website_url + str(item_id)
    qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=10, border=4)
    qr.add_data(qr_data)
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color="black", back_color="white")
    qr_image.save("qr_code.png")

# Example usage:
item_id = input("Enter the item ID: ")
generate_qr_code(item_id)
