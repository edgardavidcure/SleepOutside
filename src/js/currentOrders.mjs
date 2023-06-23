import { getOrders } from "./externalServices.mjs";

export async function orders() {
    const ordersData = await getOrders();
    console.log(ordersData);
    
    if (Array.isArray(ordersData)) {
      const result = ordersData.reduce((groupedOrders, order) => {
        const { fname, lname } = order;
        const fullName = `${fname} ${lname}`;
        
        if (!groupedOrders[fullName]) {
          groupedOrders[fullName] = [];
        }
        groupedOrders[fullName].push(order);
        return groupedOrders;
      }, {});
      
      console.log(result);
    }
  }


