## MQTT Image Uploader

A very simple mqtt client created to upload an image to HomeAssistant.

### Configs

The following configurations can be modified by setting environment variables:

| **ENV**          | **Required** | **Default**                        |
|------------------|--------------|------------------------------------|
| MQTT_BROKER_URL  | x            | mqtt://127.0.0.1:1883              |
| FILENAME         | x            | /mnt/UDISK/log/0_png.png           |
| NAME             |              | Mi Hihi map                        |
| UNIQUE_ID        |              | mihihi_map                         |
| TOPIC            |              | nqkdev/image_uploader/${UNIQUE_ID} |
| AUTO_CONF_PREFIX |              | homeassistant                      |

