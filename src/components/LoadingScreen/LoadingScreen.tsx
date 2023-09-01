import React from "react";
import { Spinner } from "reactstrap";
import warehouseAnimation from "../../assets/lotties/warehouse2.json";
import { useLottie } from "lottie-react";

const LoadingScreen = () => {
     const options = {
          animationData: warehouseAnimation,
          loop: true,
     };

     const { View } = useLottie(options);

     return (
          <div
               className="loading-screen"
               style={{
                    position: "absolute",
                    right: 0,
                    left: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: "white",
                    zIndex: 100000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
               }}
          >
               {/* <Lottie options={lottieOptions} height={150} width={150} /> */}
               {View}
          </div>
     );
};

export default LoadingScreen;
