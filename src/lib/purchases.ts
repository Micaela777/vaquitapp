import { db } from "./db/conn";
import { purchases } from "./db/schema/purchases";
import { eq } from "drizzle-orm";

type Purchase = {
  id: string;
  from: string;
  amount: number;
  message: string;
  date: Date;
  status: string;
};

export async function getConfirmedPayments(): Promise<Purchase[]> {
  const result = await db
    .select()
    .from(purchases)
    .where(eq(purchases.status, "confirmed"));

  return result.map((p) => ({
    id: String(p.id),
    from: p.from,
    amount: p.amount,
    message: p.message ?? "",
    date: p.date,
    status: p.status,
  }));
}

export async function createPurchase(
  newPurchInput: Pick<Purchase, "from" | "amount" | "message">
): Promise<string> {
  const [inserted] = await db
    .insert(purchases)
    .values({
      from: newPurchInput.from,
      amount: newPurchInput.amount,
      message: newPurchInput.message,
      status: "pending",
    })
    .returning({ id: purchases.id });

  return String(inserted.id);
}

export async function confirmPurchase(purchaseId: string) {
  await db
    .update(purchases)
    .set({ status: "confirmed" })
    .where(eq(purchases.id, Number(purchaseId)));

  return true;
}