import { checkLogin } from "./auth.mjs";
import { orders } from "./currentOrders.mjs";

checkLogin();
orders()