import React from 'react'

const ProfileItem = ({profile}) => {
  return (
    <div className="profileItem" style={{marginBottom:"20px"}}>
        <p><strong>Business Name: </strong>{profile.businessName}</p>
        <p><strong>Business Type: </strong>{profile.businessType}</p>
        <p><strong>Business Owner: </strong>{profile.businessOwner}</p>
        <p><strong>Business Registration Date: </strong>{profile.businessRegistrationDate}</p>
        <p><strong>Admin Approval: </strong>{profile.approvalByAdmin === true ? <span>APPROVED</span> : <span>NOT APPROVED</span>}</p>
        <a href={profile.businessLegalDocument} target="_blank">VIEW DOCUMENTS</a>
    </div>
  )
}

export default ProfileItem