import { consumer } from './kafka';
import { createStripeProduct, deleteStripeProduct } from './stripeProduct';

export const runKafkaSubscriptions = async () => {
    console.log('Run Kafka Subscriptions');
    (await consumer).subscribe('product-created', async (message) => {
        const product = message.value;
        console.log('Received message: product-created', product);

        await createStripeProduct(product);
    });

    (await consumer).subscribe('product.deleted', async (message) => {
        const productId = message.value;
        console.log('Received message: product.deleted', productId);

        await deleteStripeProduct(productId);
    });
};
