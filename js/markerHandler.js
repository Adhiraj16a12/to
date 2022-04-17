AFRAME.registerComponent("markerhandler", {
  init: async function() {
    var crena = await this.getCrane();

    this.el.addEventListener("markerFound", () => {
      var markerId = this.el.id;
      this.handleMarkerFound(crena, markerId);
    });

    this.el.addEventListener("markerLost", () => {
      this.handleMarkerLost();
    });
  },
  handleMarkerFound: function(crena, markerId) {
    // Changing button div visibility
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "flex";

    var orderButtton = document.getElementById("order-button");
    var orderSummaryButtton = document.getElementById("order-summary-button");

    // Handling Click Events
    orderButtton.addEventListener("click", () => {
      swal({
        icon: "alert",
        title: "Thanks For Order !",
        text: " Wait ",
        timer: 2000,
        buttons: false
      });
    });

    orderSummaryButtton.addEventListener("click", () => {
      swal({
        icon: "warning",
        title: "Order Summary",
        text: "Work In Progress"
      });
    });

    // Changing Model scale to initial scale
    var cra = crena.filter(cra => cra.id === markerId)[0];

    var model = document.querySelector(`#model-${crane.id}`);
    model.setAttribute("position", crane.model_geometry.position);
    model.setAttribute("rotation", crane.model_geometry.rotation);
    model.setAttribute("scale", crane.model_geometry.scale);
  },
  getToys: async function() {
    return await firebase
      .firestore()
      .collection("cranes")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  },
  handleMarkerLost: function() {
    // Changing button div visibility
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "none";
  }
});
