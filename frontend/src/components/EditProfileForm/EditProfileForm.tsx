import React from 'react'
import { Form, Button } from "antd";
function EditProfileForm({viewEditForm}: any) {
  return (
    <div>EditProfileForm
      <Button onClick={viewEditForm}>Отменить</Button>
    </div>
  )
}

export default EditProfileForm