const mqtt = require('mqtt')
const fs = require('fs')

const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || 'mqtt://127.0.0.1:1883'
const FILENAME = process.env.FILENAME || '/mnt/UDISK/log/0_png.png'
const NAME = process.env.NAME || 'Mi Hihi map'
const UNIQUE_ID = process.env.UNIQUE_ID || 'mihihi_map'
const TOPIC = process.env.TOPIC || `nqkdev/image_uploader/${UNIQUE_ID}`
const AUTO_CONF_PREFIX = process.env.AUTO_CONF_PREFIX || 'homeassistant'

if (!MQTT_BROKER_URL.trim() || !NAME.trim() || !UNIQUE_ID.trim() || !TOPIC.trim()) {
    console.error('Invalid configuration')
    process.exit(1)
}
if (!fs.existsSync(FILENAME)) {
    console.error(`File '${FILENAME}' not found`)
    process.exit(1)
}

const client = mqtt.connect(MQTT_BROKER_URL)
client.on('connect', () => console.log(`MQTT connection to ${MQTT_BROKER_URL} established.`))
client.on('error', console.error)

let publishOptions = {
    retain: true
}

if (AUTO_CONF_PREFIX.trim()) {
    const autoConfTopic = `${AUTO_CONF_PREFIX}/camera/image_uploader_${UNIQUE_ID}/config`
    client.publish(autoConfTopic, JSON.stringify({
        name: NAME,
        unique_id: UNIQUE_ID,
        topic: TOPIC
    }), publishOptions, console.log)
    console.log(`Auto config published to '${autoConfTopic}'`)
}

client.publish(TOPIC, fs.readFileSync(FILENAME), publishOptions, console.log)
console.log('Published image')

fs.watch(FILENAME, function (event, name) {
    if (event == 'change') {
        client.publish(TOPIC, fs.readFileSync(FILENAME), publishOptions, console.log)
        console.log('Published image')
    }
});