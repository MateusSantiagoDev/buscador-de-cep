import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
} from "react-native";
import api from "./src/services/api";

export default function App() {
  const [cep, setCep] = useState("");
  const [result, setResult] = useState(null);
  const inputFocus = useRef(null);

  async function buscar() {
    if (cep == "") {
      alert("Digite um cep valido");
      setCep("");
      return;
    }
    try {
      const response = await api.get(`/ws/${cep}/json/`);
      setResult(response.data);
      Keyboard.dismiss(); // garante que o teclado seja fechado
    } catch (err) {
      alert("Digite um cep valido");
    }
  }

  function limpar() {
    setCep("");
    inputFocus.current.focus();
    setResult(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 79003241"
          value={cep}
          onChangeText={(value) => setCep(value)}
          keyboardType="numeric" // abre o teclado numérico
          ref={inputFocus}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: "#1d75cd" }]}
        >
          <Text style={styles.btnText} onPress={buscar}>
            Buscar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: "#cd3e1d" }]}
        >
          <Text style={styles.btnText} onPress={limpar}>
            Limpar
          </Text>
        </TouchableOpacity>
      </View>

      {result && (
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {result.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {result.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {result.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {result.localidade}</Text>
          <Text style={styles.itemText}>Estado: {result.uf}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 50,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    width: "90%",
    padding: 10,
    fontSize: 18,
  },
  areaBtn: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-around",
  },
  botao: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 22,
    color: "#fff",
  },
  resultado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 22,
  },
});
