import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import {Formik, Field} from 'formik';
import {Radio, Checkbox, Switch} from 'native-base';
import * as yup from 'yup';
import CustomInput from './CustomInput';

const initialValues = {
  name: '',
  age: '',
  email: '',
  description: '',
  status: 'married',
  //isAccept: true,
  //isActive: true,
};

// const signUpValidationSchema = yup.object().shape({
//   fullName: yup
//     .string()
//     .matches(/(\w.+\s).+/, 'Enter at least 2 names')
//     .required('Full name is required'),
//   phoneNumber: yup
//     .string()
//     .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
//     .required('Phone number is required'),
//   email: yup
//     .string()
//     .email("Please enter valid email")
//     .required('Email is required'),
//   password: yup
//     .string()
//     .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
//     .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
//     .matches(/\d/, "Password must have a number")
//     .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
//     .min(8, ({ min }) => `Password must be at least ${min} characters`)
//     .required('Password is required'),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref('password')], 'Passwords do not match')
//     .required('Confirm password is required'),
// })

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(6, 'Name should not be less than 6 letters')
    .required('Name required!!!'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email required!!!'),
  description: yup
    .string()
    .max(10, 'Description should not be more than 10 letters.'),
  age: yup
    .number()
    .required('Please enter your age.')
    .positive('Enter positive number')
    .integer('Only enter string'),
});

const FormikYup = () => {
  const handleOnSubmit = formValues => {
    console.log(formValues);
    // Alert.alert(JSON.stringify(formValues));
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <Field
              component={CustomInput}
              placeholder="Your Name"
              name="name"
            />
            <Field
              component={CustomInput}
              placeholder="Your Age"
              name="age"
              keyboardType="numeric"
            />
            <Field
              component={CustomInput}
              placeholder="Your Email"
              name="email"
              keyboardType="email-address"
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

            <Field
              component={CustomInput}
              placeholder="Your description..."
              name="description"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />

            <Pressable
              disabled={!isValid}
              style={[
                styles.btn,
                {backgroundColor: isValid ? 'gold' : 'goldenrod'},
              ]}
              onPress={handleSubmit}>
              <Text>Submit</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </ScrollView>
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
    marginTop: 15,
  },
  statusCover: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
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
  errMsg: {
    color: 'red',
    fontSize: 12,
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
