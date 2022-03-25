import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import {useFormik, Formik} from 'formik';
import {Radio, Checkbox, Switch, TextArea} from 'native-base';

const initialValues = {
  name: '',
  email: '',
  description: '',
  status: 'married',
  //isAccept: true,
  //isActive: true,
};

const FormikYup = () => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => console.log(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            <TextInput
              style={styles.input}
              value={values.name}
              onChangeText={handleChange('name')}
              placeholder="Your Name"
            />
            <TextInput
              style={styles.input}
              value={values.email}
              onChangeText={handleChange('email')}
              placeholder="Your Email"
            />

            <Radio.Group
              name="status"
              accessibilityLabel="Martial Status"
              style={styles.statusCover}
              value={values.status}
              onChange={handleChange('status')}>
              <Radio shadow={2} value="married">
                Married
              </Radio>
              <Radio shadow={2} value="unmarried">
                UnMarried
              </Radio>
              <Radio shadow={2} value="divorced">
                Divorced
              </Radio>
            </Radio.Group>

            {/* <Checkbox
              name="isAccept"
              shadow={2}
              accessibilityLabel="Accept"
              mt={3}
              value={values.isAccept}
              onChange={handleChange('isAccept')}>
              I accept the terms & conditions
            </Checkbox>

            <View style={styles.activeCover}>
              <Text style={styles.activeText}>Active User</Text>
              <Switch
                name="isActive"
                value={values.isActive}
                onChange={handleChange('isActive')}
                alignSelf="flex-start"
              />
            </View> */}

            <TextArea
              h={20}
              bgColor="#fff"
              mt={3}
              placeholder="Your description..."
              value={values.description}
              onChangeText={handleChange('description')}
            />

            <Pressable style={styles.btn} onPress={handleSubmit}>
              <Text>Submit</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};

export default FormikYup;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  statusCover: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activeCover: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  activeText: {
    fontSize: 16,
    color: '#000',
  },
  description: {
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  btn: {
    height: 35,
    width: 150,
    backgroundColor: 'gold',
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

// NOTE THIS ONE FOR REACT APP
// const formik = useFormik({
//     initialValues: {
//         username: "",
//         name: "",
//         email: ""
//     },
//     onSubmit: values => {
//         alert(JSON.stringify(values, null, 2));
//       },
// })

{
  /* <form onSubmit={formik.handleSubmit}>
<input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} />
</form> */
}
