import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as select from "../data/selectors";
import { Field } from "formik";
import { FormikSelectComponent } from "../../../utilities/formUtils";
import userACL from "../../../store/access";

const UserListSelect = (
  {
    name,
    isTxn,
    isLabel,
    label,
    isSelection,
    focus,
    placeholder,
    validation,
    computeValue,
    index,
    fieldName,
    fromField,
    otherList,
    passFunct,
    classNameGet,
    getValue: callback,
  },
  props
) => {

  const options = useSelector((state) =>
    select.selectUserListOptions(state, props)
  );
 

  const getValue = (value, setFieldValue, values) => {
    if (passFunct) {
      passFunct(value);
    }
  };

  return (
    <Field
      name={name}
      isLabel={isLabel}
      isTxn={isTxn}
      label={label}
      classNameGet={classNameGet}
      validation={validation}
      isSelection={isSelection}
      component={FormikSelectComponent}
      computeValue={computeValue}
      index={index}
      fieldName={fieldName}
      fromField={fromField}
      otherList={otherList}
      userProps={{ options, getValue }}
      focus={focus}
      placeholder={placeholder}
      className="selectInput"
    >
    </Field>
  );
};

export default UserListSelect;
