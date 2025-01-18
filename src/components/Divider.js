import { View } from "react-native";

const Divider = ({ rootStyle }) => {
  return (
    <View
      style={[
        {
          height: 1,
          width: "80%",
          backgroundColor: "#dddddd",
          marginVertical: 12,
        },
        rootStyle,
      ]}
    ></View>
  );
};

export default Divider;
