import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: "84%",
    padding: 10,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: "center",
    alignSelf: 'center',
    zIndex: 2
  },
  toastText: { marginLeft: 14, fontSize: 16 },
  successToastCon: {
    backgroundColor: "#DEf1D7",
    borderColor: "#1f8722",
  },
  warningToastCon: {
    backgroundColor: "#FEF7Ec",
    borderColor: "#F08135",
  },
  errorToastCon: {
    backgroundColor: "#FAE1DB",
    borderColor: "#D9100A",
  },
  toastIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  successText: {
    color: "#1f8722",
  },
  warningText: {
    color: "#F08135",
  },
  errorText: { color: "#D9100A", },
})