import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { API } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) navigation.navigate("Tasks");
    };
    checkToken();
  }, []);

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      await AsyncStorage.setItem("token", res.data.token);
      navigation.navigate("Tasks");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>LOGIN</Text>

          <TextInput
            placeholder="User Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.link}>
              Don’t have an account? Signup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
    backgroundColor: "#ffe5d0",
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },


  card: {
    width: "75%",
    minHeight: 360,
    paddingVertical: 35,
    paddingHorizontal: 25,
    borderRadius: 18,
    backgroundColor: "#fff",


    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 12,
    marginBottom: 25,
    color: "#333",
    fontSize: 15,
    padding:6
  },

  button: {
    backgroundColor: "#ff8c42",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: {
    marginTop: 18,
    textAlign: "center",
    color: "#ff8c42",
    fontSize: 13,
  },
});