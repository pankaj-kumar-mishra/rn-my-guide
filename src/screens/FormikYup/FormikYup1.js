import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import {useFormik, Formik} from 'formik';
import {Radio, Checkbox, Switch, TextArea} from 'native-base';
import * as yup from 'yup';

const initialValues = {
  name: '',
  age: '',
  email: '',
  description: '',
  status: 'married',
  //isAccept: true,
  //isActive: true,
};

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

const FormikYup1 = () => {
  const handleOnSubmit = formValues => {
    console.log(formValues);
    // Alert.alert(JSON.stringify(formValues));
  };

  return (
    <View style={styles.container}>
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
            {/* {console.log(errors)} */}
            <TextInput
              style={styles.input}
              value={values.name}
              onChangeText={handleChange('name')}
              placeholder="Your Name"
              onBlur={handleBlur('name')}
            />
            {errors.name && touched.name && (
              <Text style={styles.errMsg}>{errors.name}</Text>
            )}
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={values.age}
              onChangeText={handleChange('age')}
              placeholder="Your Age"
              onBlur={handleBlur('age')}
            />
            {errors.age && touched.age && (
              <Text style={styles.errMsg}>{errors.age}</Text>
            )}
            <TextInput
              style={styles.input}
              value={values.email}
              onChangeText={handleChange('email')}
              placeholder="Your Email"
              onBlur={handleBlur('email')}
            />
            {errors.email && touched.email && (
              <Text style={styles.errMsg}>{errors.email}</Text>
            )}
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

            <TextInput
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              style={[styles.input, {height: 80}]}
              placeholder="Your description..."
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
            />
            {errors.description && touched.description && (
              <Text style={styles.errMsg}>{errors.description}</Text>
            )}
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
    </View>
  );
};

export default FormikYup1;

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
