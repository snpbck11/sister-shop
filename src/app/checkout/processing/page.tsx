import { CheckoutNotification } from "@/widgets/CheckoutNotification";

export default async function CheckoutNotificationPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return <CheckoutNotification orderId={orderId} />;
}
