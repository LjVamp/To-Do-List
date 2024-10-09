import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#BEC6A0',
  },
  title: {
    fontSize: width > 500 ? 24 : 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 15,
    color: '#3C3D37',
  },
  searchBar: {
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: width > 500 ? 50 : 20,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#708871',
  },
  buttonText: {
    color: '#708871',
    fontSize: width > 500 ? 16 : 12,
  },
  buttonSelected: {
    backgroundColor: '#708871',
  },
  buttonTextSelected: {
    color: '#ffffff',
    fontSize: width > 500 ? 16 : 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    fontSize: width > 500 ? 18 : 14,
    flex: 1,
    marginLeft: 10,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#9CA986',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 50,
  },
  iconSpacing: {
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    fontSize: width > 500 ? 16 : 14,
  },
});
