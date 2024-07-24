'use client'
import React, { useState } from 'react'
import styles from '@/styles/contactBox.module.css';
import Image from 'next/image';

const ContactBox = ({onClose}) => {

    const [leaveType, setLeaveType] = useState('Sick')


  return (
    <>
    <div className={styles.main}>
        <div className={styles.submain}>
            <div className={styles.requestTop}>
                <div className={styles.requestTopright}>
                    <div onClick={onClose} className={styles.requestClose}>
                        <Image src="/images/icons/closeIcon.svg" alt="close" width={20} height={20} />
                    </div>
                </div>

                <div className={styles.requestTitle}>
                    Request Register
                </div>

            </div>
            <div className={styles.requestContent}>
                <div className={styles.requestContentTop}>
                    <div className={styles.requestNameTitle}>
                        <div className={styles.firstName}>
                            First Name:
                        </div>
                        <div>
                            <input placeholder='First Name' ></input>
                        </div>
                    </div>

                    <div className={styles.requestNameTitle}>
                        <div className={styles.firstName}>
                            Last Name:
                        </div>
                        <div>
                            <input placeholder='Last Name' ></input>
                        </div>
                    </div>
                    


                    {/* <div className={styles.firstName}>
                        Leave Type:
                    </div>
                    <div className={styles.requesttype}>
                        <div className={styles.requesttypebuttons}>
                            <div className={`${styles.requesttypebuttonbox} ${leaveType === 'Sick' ? styles.selected : ''}`} onClick={() => setLeaveType('Sick')}>
                                Sick
                            </div>
                        </div>
                        <div className={styles.requesttypebuttons}>
                            <div className={`${styles.requesttypebuttonbox} ${leaveType === 'Vacation' ? styles.selected : ''}`} onClick={() => setLeaveType('Vacation')}>
                                Vacation
                            </div>
                        </div>
                        <div className={styles.requesttypebuttons}>
                            <div className={`${styles.requesttypebuttonbox} ${leaveType === 'Others' ? styles.selected : ''}`} onClick={() => setLeaveType('Others')}>
                                Others
                            </div>
                        </div>
                    </div> */}
                </div>
                {/* <div className={styles.requestContentMiddle}>
                    <div className={styles.requestDateTitle}>
                        Select Date:
                    </div>
                    <div className={styles.requestDate}>
                        
                    </div>
                </div>
                <div className={styles.requestContentBottom}>
                    <div className={styles.requestReasonTitle}>
                        Reason:
                    </div>
                    <div className={styles.requestReason}>

                    </div>
                </div> */}
            </div>
            <div className={styles.requestButton}>
                <div className={styles.requestSubmit}>Request</div>
            </div>
        </div>
    </div>
    </>
  )
}

export default ContactBox