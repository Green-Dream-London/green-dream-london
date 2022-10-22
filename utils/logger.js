const {transports, createLogger, format} = require('winston')

const currentDate = new Date()

const timezoned = () => {
    return new Date().toLocaleString('en-US', {
        timeZone: 'Europe/Sofia'
    });
}

const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.timestamp({ format: timezoned }),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: `logs/log-${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}.txt` })]
})

module.exports = logger
