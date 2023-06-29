import { getOrders } from "./externalServices.mjs";

export async function orders() {

  let table = document.querySelector("#ordersTable tbody");

    const ordersData = await getOrders();
    
    if (Array.isArray(ordersData)) {

        let rows = "";
        if(Array.isArray){
          ordersData.forEach(item => {
            let date = new Date(Date.parse(item.orderDate)).toLocaleDateString("en-us", { weekday:"long", year:"numeric", month:"short", day:"numeric"})
            rows += `<tr>
            <td>${item.fname} ${item.lname}</td>
            <td>${date}</td>
            <td>${item.items ? item.items.length : 0}</td>
            <td>R$ ${item.orderTotal}</td>
            </tr>`
          });
        }else {
          rows = "<tr>No old orders :(</tr>"  
        }
        table.innerHTML = rows;
      
      console.log(ordersData);
  }
}



      const result = ordersData.reduce((groupedOrders, order) => {
        const { fname, lname } = order;
        const fullName = `${fname} ${lname}`;
        
        if (!groupedOrders[fullName]) {
          groupedOrders[fullName] = [];
        }
        groupedOrders[fullName].push(order);
        return groupedOrders;
      }, {});
      
   


  

