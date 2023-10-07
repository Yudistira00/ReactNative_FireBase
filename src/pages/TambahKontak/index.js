import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Alert} from 'react-native';
import {InputData} from '../../components';
import FIREBASE from '../../config/FIREBASE';

export default class TambahKontak extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: '',
      nomorHP: '',
      alamat: '',
    };
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

  onSubmit = () => {
    const nama = this.state.nama;
    const nomorHP = this.state.nomorHP;
    

    if(nama.length < 5) {
      Alert.alert("Maaf", "Nama setidaknya harus 5 karakter atau lebih")
    } else if(nomorHP.length < 13) {
      Alert.alert("Maaf", "Nomor HP Minimal 13 angka!!!")
      
    } else {

      if (this.state.nama && this.state.nomorHP && this.state.alamat) {
        const kontakReferensi = FIREBASE.database().ref('Kontak');
        const kontak = {
          nama: this.state.nama,
          nomorHP: this.state.nomorHP,
          alamat: this.state.alamat,
        };
  
        kontakReferensi
          .push(kontak)
          .then(data => {
            Alert.alert('Berhasil', 'Kontak Tersimpan');
            this.props.navigation.replace('Home');
          })
          .catch(error => {
            console.log('Error : ', Error);
          });
      } else {
        Alert.alert('Error', 'Nama, Nomor HP, dan Alamat Harus diisi');
      }
    }

    
  };

  render() {
    return (
      <View style={styles.pages}>
        <InputData
          label="Nama"
          placeholder="Masukan Nama"
          onChangeText={this.onChangeText}
          value={this.state.nama}
          namaState="nama"
        />
        <InputData
          label="No. HP"
          placeholder="Masukkan No. HP"
          keyboardType="number-pad"
          onChangeText={this.onChangeText}
          value={this.state.nomorHP}
          namaState="nomorHP"
        />
        <InputData
          label="Alamat"
          placeholder="Masukan Alamat"
          isTextArea={true}
          onChangeText={this.onChangeText}
          value={this.state.alamat}
          namaState="alamat"
        />
        <TouchableOpacity style={styles.tombol} onPress={() => this.onSubmit()}>
          <Text style={styles.textTombol}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    padding: 25,
  },

  tombol: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  textTombol: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
});
