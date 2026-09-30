import { pgTable, varchar, text, integer, timestamp} from "drizzle-orm/pg-core";

export const purchases = pgTable("purchases", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    from: varchar("from", { length: 255 }).notNull(),
    amount: integer("amount").notNull(),
    message: text("message"),
    date: timestamp("date").defaultNow().notNull(),
    status: varchar("status", { length: 50 }).notNull()
});