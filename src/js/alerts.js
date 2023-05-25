import { getData } from "./productData.mjs";

export default class Alert {

   async alertsHTml() {
    let alerts = await getData("alerts")
    return this.buidAlerts(alerts);
}

buidAlerts(listAlerts) {
    if (listAlerts.length > 0) {
      let alertsP = "";
      listAlerts.map((item) => {
        alertsP = alertsP + `<p style="background-color:${item.background} ; color: ${item.color};">${item.message}</p>`
      });
      alertsP = "<section class=\"alert-list\">" + alertsP + "</section>";
      return alertsP;
    }else {
        return "";
    }
  }
}
