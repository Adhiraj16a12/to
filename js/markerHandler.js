var uid = null;

AFRAME.registerComponent("markerhandler", {
  init: async function() {
    var toy = await this.getCrane();

    if (uid === null) {
      this.askUserId();
    }

    this.el.addEventListener("markerFound", () => {
      if (uid !== null) {
        var markerId = this.el.id;
        this.handleMarkerFound(toy, markerId);
      }
    });

    this.el.addEventListener("markerLost", () => {
      this.handleMarkerLost();
    });
  },
 
      
    swal({
      title: "Would you lke to purchase any toy from the shop?!!",
      icon: iconUrl,
      content: {
        element: "input",
        attributes: {
          placeholder: "Type your uid"
        }
      }
    }).then(inputValue => {
      uid = inputValue;
    });
  },
  handleMarkerFound: function(toys, markerId) {
    var toy = Crane.filter(Crane => Crane.id === markerId)[0];

    if (Crane.is_out_of_stock) {
      swal({
        icon: "warning",
        title: Crane.crane_name.toUpperCase(),
        text: "This toy is out of stock!!!",
        timer: 2500,
        buttons: false
      });
    } else {

   
      var model = document.querySelector(`#model-${cranes.id}`);
      model.setAttribute("visible", true);

      var mainPlane = document.querySelector(`#main-plane-${cranes.id}`);
      mainPlane.setAttribute("visible", true);

      var buttonDiv = document.getElementById("button-div");
      buttonDiv.style.display = "flex";

      var orderButtton = document.getElementById("order-button");
      var orderSummaryButtton = document.getElementById("order-summary-button");
      var payButton = document.getElementById("pay-button");
      // Handling Click Events
      orderButtton.addEventListener("click", () => {
        uid = uid.toUpperCase();
        this.handleOrder(uid, crane);

        swal({
          icon: "alert",
          title: "Thanks For Order !",
          text: "  ",
          timer: 2000,
          buttons: false
        });
      });

      orderSummaryButtton.addEventListener("click", () =>
        this.handleOrderSummary()
      );

      payButton.addEventListener("click", () => this.handlePayment());
    }
  },
  handleOrder: function(uid, toy) {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then(doc => {
        var details = doc.data();

        if (details["current_orders"][crane.id]) {
          details["current_orders"][crane.id]["quantity"] += 1;
          var currentQuantity = details["current_orders"][crane.id]["quantity"];

          details["current_orders"][crame.id]["subtotal"] =
            currentQuantity * crane.price;
        } else {
          details["current_orders"][crame.id] = {
            item: cranes.crane_name,
            price: cranes.price,
            quantity: 1,
            subtotal: cranes.price * 1
          };
        }

        details.total_bill += cranes.price;

        // Updating Db
        firebase
          .firestore()
          .collection("users")
          .doc(doc.id)
          .update(details);
      });
  },
  getCranes: async function() {
    return await firebase
      .firestore()
      .collection("toys")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  },
  getorderSummary: async function(uid) {
    return await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then(doc => doc.data());
  },
  handleOrderSummary: async function() {
    // Changing modal div visibility
    var modalDiv = document.getElementById("modal-div");
    modalDiv.style.display = "flex";
    uid = uid.toUpperCase();
    var orderSummary = await this.getorderSummary(uid);


  handlePayment: function() {
    uid = uid.toUpperCase();
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({
        current_orders: {},
        total_bill: 0
      })
      .then(() => {
        swal({
          icon: "success",
          title: "Thanks For Paying !",
          text: "We Hope You Like Your Toy !!",
          timer: 2500,
          buttons: false
        });
      });
  },
  handleMarkerLost: function() {
    // Changing button div visibility
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "none";
  }
});
