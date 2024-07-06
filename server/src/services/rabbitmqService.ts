import amqp from 'amqplib';

const queue = 'task_reminders';

async function sendTaskReminder(taskId: number): Promise<void> {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: true });

        const message = `Hi, your Task is due ${taskId}`;
        channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

        console.log(`[x] Sent '${message}'`);
        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error('Error sending task reminder:', error);
    }
}

async function consumeTaskReminders(): Promise<void> {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: true });

        console.log(`[*] Waiting for messages in '${queue}'. To exit press CTRL+C`);

        channel.consume(queue, (message) => {
            if (message) {
                console.log(`[x] Received '${message.content.toString()}'`);
                // Add logging or processing logic here
                channel.ack(message);
            }
        }, { noAck: false });
    } catch (error) {
        console.error('Error consuming task reminders:', error);
    }
}

export default {
    sendTaskReminder,
    consumeTaskReminders
};
