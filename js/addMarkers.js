AFRAME.registerComponent("create-markers", {
  init: async function () {
    var mainScene = document.querySelector("#main-scene");
    var cranes = await this.getCranes();
    cranes.map(crane => {
      var marker = document.createElement("a-marker");
      marker.setAttribute("id", crane.id);
      marker.setAttribute("type", "pattern");
      marker.setAttribute("url", crane.marker_pattern_url);
      marker.setAttribute("cursor", {
        rayOrigin: "mouse"
      });
      marker.setAttribute("markerhandler", {});
      mainScene.appendChild(marker);
      console.log(crane.marker_pattern_url)

      // Getting today's day
      var todaysDate = new Date();
      var todaysDay = todaysDate.getDay();
      // Sunday - Saturday : 0 - 6
      var days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
      ];

      if (!crane.unavailable_days.includes(days[todaysDay])) {
        // Adding 3D model to scene
        var model = document.createElement("a-entity");
        model.setAttribute("id", `model-${crane.id}`);
        model.setAttribute("position", crane.position);
        model.setAttribute("rotation", crane.rotation);
        model.setAttribute("scale", crane.scale);
        model.setAttribute("gltf-model", `url(${crane.model_url})`);
        model.setAttribute("gesture-handler", {});
        model.setAttribute("visible", false);
        marker.appendChild(model);

        // Crane Container
        var mainPlane = document.createElement("a-plane");
        mainPlane.setAttribute("id", `main-plane-${crane.id}`);
        mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
        mainPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        mainPlane.setAttribute("width", 1.7);
        mainPlane.setAttribute("height", 1.5);
        mainPlane.setAttribute("visible", false);
        marker.appendChild(mainPlane);

        // Crane title background plane
        var titlePlane = document.createElement("a-plane");
        titlePlane.setAttribute("id", `title-plane-${crane.id}`);
        titlePlane.setAttribute("position", { x: 0, y: 0.89, z: 0.02 });
        titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        titlePlane.setAttribute("width", 1.69);
        titlePlane.setAttribute("height", 0.3);
        titlePlane.setAttribute("material", { color: "#F0C30F" });
        mainPlane.appendChild(titlePlane);

        // Crane title
        var craneTitle = document.createElement("a-entity");
        craneTitle.setAttribute("id", `crane-title-${crane.id}`);
        craneTitle.setAttribute("position", { x: 0, y: 0, z: 0.1 });
        craneTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        craneTitle.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 1.8,
          height: 1,
          align: "center",
          value: crane.crane_name.toUpperCase()
        });
        titlePlane.appendChild(craneTitle);

        // Parts List
        var ingredients = document.createElement("a-entity");
        ingredients.setAttribute("id", `parts-${crane.id}`);
        ingredients.setAttribute("position", { x: 0.3, y: 0, z: 0.1 });
        ingredients.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        ingredients.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 2,
          align: "left",
          value: `${crane.parts.join("\n\n")}`
        });
        mainPlane.appendChild(parts);

        // Crane Price
        var pricePlane = document.createElement("a-image");
        pricePlane.setAttribute("id", `price-plane-${crane.id}`);
        //Take the plane reference from class code
        pricePlane.setAttribute(
          "src", "https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/black-circle.png"
        );
        pricePlane.setAttribute("width", 0.8);
        pricePlane.setAttribute("height", 0.8);
        pricePlane.setAttribute("position", { x: -1.3, y: 0, z: 0.3 });
        pricePlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        pricePlane.setAttribute("visible", false);

        var price = document.createElement("a-entity");
        price.setAttribute("id", `price-${crane.id}`);
        price.setAttribute("position", { x: 0.03, y: 0.05, z: 0.1 });
        price.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        price.setAttribute("text", {
          font: "mozillavr",
          color: "white",
          width: 3,
          align: "center",
          value: `Only\n $${crane.price}`
        });

        pricePlane.appendChild(price);
        marker.appendChild(pricePlane);

        // Crane Rating plane
        var ratingPlane = document.createElement("a-entity");
        ratingPlane.setAttribute("id", `rating-plane-${crane.id}`);
        ratingPlane.setAttribute("position", { x: 2, y: 0, z: 0.5 });
        ratingPlane.setAttribute("geometry", {
          primitive: "plane",
          width: 1.5,
          height: 0.3
        });

        ratingPlane.setAttribute("material", {
          color: "#F0C30F"
        });
        ratingPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        ratingPlane.setAttribute("visible", false);

        // Ratings
        var rating = document.createElement("a-entity");
        rating.setAttribute("id", `rating-${crane.id}`);
        rating.setAttribute("position", { x: 0, y: 0.05, z: 0.1 });
        rating.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        rating.setAttribute("text", {
          font: "mozillavr",
          color: "black",
          width: 2.4,
          align: "center",
          value: `Customer Rating: ${crane.last_rating}`
        });

        ratingPlane.appendChild(rating);
        marker.appendChild(ratingPlane);

        // Crane review plane
        var reviewPlane = document.createElement("a-entity");
        reviewPlane.setAttribute("id", `review-plane-${crane.id}`);
        reviewPlane.setAttribute("position", { x: 2, y: 0, z: 0 });
        reviewPlane.setAttribute("geometry", {
          primitive: "plane",
          width: 1.5,
          height: 0.5
        });

        reviewPlane.setAttribute("material", {
          color: "#F0C30F"
        });
        reviewPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        reviewPlane.setAttribute("visible", false);

        // Crane review
        var review = document.createElement("a-entity");
        review.setAttribute("id", `review-${crane.id}`);
        review.setAttribute("position", { x: 0, y: 0.05, z: 0.1 });
        review.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        review.setAttribute("text", {
          font: "mozillavr",
          color: "black",
          width: 2.4,
          align: "center",
          value: `Customer Review: \n${crane.last_review}`
        });
        
        reviewPlane.appendChild(review);
        marker.appendChild(reviewPlane);
      }
    });
  },
  getCrane: async function () {
    return await firebase
      .firestore()
      .collection("cranes")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  }
});
