'use client'

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const AdmissionSMS = () => {

    const [smsSettings, setSmsSettings] = useState([])

    const [isOsAdmission1, setIsOsAdmission1] = useState(true)
    const [isOsAdmission2, setIsOsAdmission2] = useState(true)
    const [isSsAdmission1, setIsSsAdmission1] = useState(true)
    const [isSsAdmission2, setIsSsAdmission2] = useState(true)
    const [isOtJoin1, setIsOtJoin1] = useState(true)
    const [isOtJoin2, setIsOtJoin2] = useState(true)
    const [isOeJoin1, setIsOeJoin1] = useState(true)
    const [isOeJoin2, setIsOeJoin2] = useState(true)
    const [isStJoin1, setIsStJoin1] = useState(true)
    const [isStJoin2, setIsStJoin2] = useState(true)
    const [isSeJoin1, setIsSeJoin1] = useState(true)
    const [isSeJoin2, setIsSeJoin2] = useState(true)


    const [isOsAttendance1, setIsOsAttendance1] = useState(true)
    const [isOsAttendance2, setIsOsAttendance2] = useState(true)
    const [isOaJoin1, setIsOaJoin1] = useState(true)
    const [isOaJoin2, setIsOaJoin2] = useState(true)
    const [isTaJoin1, setIsTaJoin1] = useState(true)
    const [isTaJoin2, setIsTaJoin2] = useState(true)
    const [isSsAttendance1, setIsSsAttendance1] = useState(true)
    const [isSsAttendance2, setIsSsAttendance2] = useState(true)
    const [isEaJoin1, setIsEaJoin1] = useState(true)
    const [isEaJoin2, setIsEaJoin2] = useState(true)
    const [isEoJoin1, setIsEoJoin1] = useState(true)
    const [isEoJoin2, setIsEoJoin2] = useState(true)

    const [isSAAttendance1, setIsSAAttendance1] = useState(true)
    const [isSAAttendance2, setIsSAAttendance2] = useState(true)
    const [isTeJoin1, setIsTeJoin1] = useState(true)
    const [isTeJoin2, setIsTeJoin2] = useState(true)

    const [isFcAttendance1, setIsFcAttendance1] = useState(true)
    const [isFcAttendance2, setIsFcAttendance2] = useState(true)

    const [isDfAttendance1, setIsDfAttendance1] = useState(true)
    const [isDfAttendance2, setIsDfAttendance2] = useState(true)

    const [isSrAttendance1, setIsSrAttendance1] = useState(true)
    const [isSrAttendance2, setIsSrAttendance2] = useState(true)

    const [isTsAttendance1, setIsTsAttendance1] = useState(true)
    const [isTsAttendance2, setIsTsAttendance2] = useState(true)
    const [isEsJoin1, setIsEsJoin1] = useState(true)
    const [isEsJoin2, setIsEsJoin2] = useState(true)


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const os_admission = form?.os_admission?.value
        const ot_join = form?.ot_join?.value
        const oe_join = form?.oe_join?.value
        const ss_admission = form?.ss_admission?.value
        const st_join = form?.st_join?.value
        const se_join = form?.se_join?.value

        const s_attendance = form?.s_attendance?.value
        const s_out_attendance = form?.s_out_attendance?.value
        const t_attendance = form?.t_attendance?.value
        const t_out_attendance = form?.t_out_attendance?.value
        const e_attendance = form?.e_attendance?.value
        const e_out_attendance = form?.e_out_attendance?.value

        const s_absence = form?.s_absence?.value
        const te_absence = form?.te_absence?.value
        const f_collection = form?.f_collection?.value

        const df_collection = form?.df_collection?.value
        const df_time = form?.df_time?.value
        const s_result = form?.s_result?.value
        const t_salary = form?.t_salary?.value
        const e_salary = form?.e_salary?.value


        const updateValue = {
            os_admission, ot_join, oe_join, ss_admission, st_join, se_join, s_attendance, s_out_attendance, t_attendance, t_out_attendance, e_attendance, e_out_attendance, s_absence, te_absence, f_collection, df_collection, df_time, s_result, t_salary, e_salary,
        }
        // console.log(updateValue);

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/smsSettings`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateValue)
        })
            .then(Response => Response.json())
            .then(data => {
                console.log(data)

                if (data?.affectedRows) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'admin page list edit Successful !!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    getSmsSettings();
                }
            })
    }


    useEffect(() => {
        getSmsSettings();
    }, []);

    const getSmsSettings = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/smsSettings`;
        const response = await fetch(url);
        const data = await response.json();
        setSmsSettings(data);
    };

    // console.log(smsSettings);
  

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="card bg-white m-3 shadow-sm">
                    <div className="card-header py-2 bg-light">
                        <div className="card-title mb-0 float-left font-weight-bold mt-1 text-dark ">Admission SMS</div>
                    </div>

                    <div className="card-body">
                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Online Student Admission</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-prepend input-group-text">
                                        <div>

                                            <div className="custom-control custom-switch text-left">
                                                <input
                                                    type="checkbox"
                                                    name="auto_os_admission"
                                                    className="custom-control-input common_sms"
                                                    checked={isOsAdmission1}
                                                    id="auto_os_admission"
                                                    value="1"
                                                    onChange={() => setIsOsAdmission1(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="auto_os_admission">Auto</label>
                                            </div>


                                            <div className="custom-control custom-switch">
                                                <input type="checkbox" name="is_os_admission" className="custom-control-input common_sms" checked={isOsAdmission2} id="is_os_admission" value="1" onChange={() => setIsOsAdmission2(prevState => !prevState)} />
                                                <label className="custom-control-label" htmlFor="is_os_admission">Manual</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control" name="os_admission" aria-label="With textarea" defaultValue={smsSettings[0]?.os_admission}>
                                    </textarea>
                                    <small id="passwordHelpBlock" className="form-text text-info">
                                        [[company_name]], [[full_name]], [[session]], [[shift]], [[class]], [[section]], [[roll]], [[admission_date]], [[sms_time]] Keywords refer by Company Name, Student Name, Session, Shift, Class, Section, Roll, Admission Date &amp; Sms time respectively.
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Online Teacher Join</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-prepend input-group-text">
                                        <div >
                                            <div className="custom-control custom-switch text-left">
                                                <input
                                                    type="checkbox"
                                                    name="auto_ot_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isOtJoin1}
                                                    id="auto_ot_join"
                                                    value="1"
                                                    onChange={() => setIsOtJoin1(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="auto_ot_join"> Auto</label>
                                            </div>
                                            <div className="custom-control custom-switch">
                                                <input
                                                    type="checkbox"
                                                    name="is_ot_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isOtJoin2}
                                                    id="is_ot_join"
                                                    value="1"
                                                    onChange={() => setIsOtJoin2(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="is_ot_join">Manual</label>
                                            </div>
                                        </div>
                                    </div>

                                    <textarea className="form-control" name="ot_join" aria-label="With textarea" defaultValue={smsSettings[0]?.ot_join}>
                                    </textarea>
                                    <small id="passwordHelpBlock" className="form-text text-info">
                                        [[company_name]], [[full_name]], [[teacher_id]], [[teacher_designation]], [[joining_date]], [[sms_time]], [[payroll_name]], [[payroll_total]] Keywords refer by Company Name, Teacher Name, Id, Designation, Joining Date, Sms Time, Payroll Name &amp; Payroll Total respectively.
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Online Employee Join</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-prepend input-group-text">
                                        <div>
                                            <div className="custom-control custom-switch text-left">
                                                <input
                                                    type="checkbox"
                                                    name="auto_oe_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isOeJoin1}
                                                    id="auto_oe_join"
                                                    value="1"
                                                    onChange={() => setIsOeJoin1(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="auto_oe_join">Auto</label>
                                            </div>
                                            <div className="custom-control custom-switch">
                                                <input
                                                    type="checkbox"
                                                    name="is_oe_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isOeJoin2}
                                                    id="is_oe_join"
                                                    value="1"
                                                    onChange={() => setIsOeJoin2(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="is_oe_join">Manual</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control" name="oe_join" aria-label="With textarea" defaultValue={smsSettings[0]?.oe_join}>

                                    </textarea>
                                    <small id="passwordHelpBlock" className="form-text text-info">
                                        [[company_name]], [[full_name]], [[employee_id]], [[employee_designation]], [[joining_date]], [[sms_time]], [[payroll_name]], [[payroll_total]] Keywords refer by Company Name, Employee Name, Id, Designation, Joining Date, Sms time, Payroll Name &amp; Payroll Total respectively.
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Software Student Admission</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-prepend input-group-text">
                                        <div>
                                            <div className="custom-control custom-switch text-left">
                                                <input
                                                    type="checkbox"
                                                    name="auto_ss_admission"
                                                    className="custom-control-input common_sms"
                                                    checked={isSsAdmission1}
                                                    id="auto_ss_admission"
                                                    value="1"
                                                    onChange={() => setIsSsAdmission1(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="auto_ss_admission">Auto</label>
                                            </div>
                                            <div className="custom-control custom-switch">
                                                <input
                                                    type="checkbox"
                                                    name="is_ss_admission"
                                                    className="custom-control-input common_sms"
                                                    checked={isSsAdmission2}
                                                    id="is_ss_admission"
                                                    value="1"
                                                    onChange={() => setIsSsAdmission2(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="is_ss_admission">Manual</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control" name="ss_admission" aria-label="With textarea" defaultValue={smsSettings[0]?.ss_admission}>

                                    </textarea>
                                    <small id="passwordHelpBlock" className="form-text text-info">
                                        [[company_name]], [[full_name]], [[session]], [[shift]], [[class]], [[section]], [[roll]], [[admission_date]], [[sms_time]] Keywords refer by Company Name, Student Name, Session, Shift, Class, Section, Roll, Admission Date &amp; Sms time respectively.
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Software Teacher Join</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-prepend input-group-text">
                                        <div>
                                            <div className="custom-control custom-switch text-left">
                                                <input
                                                    type="checkbox"
                                                    name="auto_st_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isStJoin1}
                                                    id="auto_st_join"
                                                    value="1"
                                                    onChange={() => setIsStJoin1(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="auto_st_join">Auto</label>
                                            </div>
                                            <div className="custom-control custom-switch">
                                                <input
                                                    type="checkbox"
                                                    name="is_st_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isStJoin2}
                                                    id="is_st_join"
                                                    value="1"
                                                    onChange={() => setIsStJoin2(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="is_st_join">Manual</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control" name="st_join" aria-label="With textarea" defaultValue={smsSettings[0]?.st_join}>

                                    </textarea>
                                    <small id="passwordHelpBlock" className="form-text text-info">
                                        [[company_name]], [[full_name]], [[teacher_id]], [[teacher_designation]], [[joining_date]], [[sms_time]], [[payroll_name]], [[payroll_total]] Keywords refer by Company Name, Teacher Name, Id, Designation, Joining Date, Sms Time, Payroll Name &amp; Payroll Total respectively.
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Software Employee Join</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-prepend input-group-text">
                                        <div>
                                            <div className="custom-control custom-switch text-left">
                                                <input
                                                    type="checkbox"
                                                    name="auto_se_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isSeJoin1}
                                                    id="auto_se_join"
                                                    value="1"
                                                    onChange={() => setIsSeJoin1(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="auto_se_join">Auto</label>
                                            </div>
                                            <div className="custom-control custom-switch">
                                                <input
                                                    type="checkbox"
                                                    name="is_se_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isSeJoin2}
                                                    id="is_se_join"
                                                    value="1"
                                                    onChange={() => setIsSeJoin2(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="is_se_join">Manual</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control" name="se_join" aria-label="With textarea" defaultValue={smsSettings[0]?.se_join}>

                                    </textarea>
                                    <small id="passwordHelpBlock" className="form-text text-info">
                                        [[company_name]], [[full_name]], [[employee_id]], [[employee_designation]], [[joining_date]], [[sms_time]], [[payroll_name]], [[payroll_total]] Keywords refer by Company Name, Employee Name, Id, Designation, Joining Date, Sms Time, Payroll Name &amp; Payroll Total respectively.
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-white m-3 shadow-sm">
                    <div className="card-header py-2 bg-light">
                        <div className="card-title mb-0 float-left font-weight-bold mt-1 text-dark ">Attendance SMS</div>
                    </div>

                    <div className="card-body">
                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Student Attendance</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-prepend input-group-text">
                                        <div>

                                            <div className="custom-control custom-switch text-left">
                                                <input
                                                    type="checkbox"
                                                    name="auto_os_attendance"
                                                    className="custom-control-input common_sms"
                                                    checked={isOsAttendance1}
                                                    id="auto_os_attendance"
                                                    value="1"
                                                    onChange={() => setIsOsAttendance1(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="auto_os_attendance">Auto</label>
                                            </div>


                                            <div className="custom-control custom-switch">
                                                <input type="checkbox" name="is_os_attendance" className="custom-control-input common_sms" checked={isOsAttendance2} id="is_os_attendance" value="1" onChange={() => setIsOsAttendance2(prevState => !prevState)} />
                                                <label className="custom-control-label" htmlFor="is_os_attendance">Manual</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control" name="s_attendance" aria-label="With textarea" defaultValue={smsSettings[0]?.s_attendance}>

                                    </textarea>
                                    <small id="passwordHelpBlock" className="form-text text-info">
                                        [[company_name]], [[full_name]], [[session]], [[shift]], [[class]], [[section]], [[roll]], [[admission_date]], [[sms_time]] Keywords refer by Company Name, Student Name, Session, Shift, Class, Section, Roll, Admission Date &amp; Sms time respectively.
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Student Out Attendance</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-prepend input-group-text">
                                        <div >
                                            <div className="custom-control custom-switch text-left">
                                                <input
                                                    type="checkbox"
                                                    name="auto_oa_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isOaJoin1}
                                                    id="auto_oa_join"
                                                    value="1"
                                                    onChange={() => setIsOaJoin1(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="auto_oa_join">Auto</label>
                                            </div>
                                            <div className="custom-control custom-switch">
                                                <input
                                                    type="checkbox"
                                                    name="is_oa_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isOaJoin2}
                                                    id="is_oa_join"
                                                    value="1"
                                                    onChange={() => setIsOaJoin2(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="is_oa_join">Manual</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control" name="s_out_attendance" aria-label="With textarea" defaultValue={smsSettings[0]?.s_out_attendance}>

                                    </textarea>
                                    <small id="passwordHelpBlock" className="form-text text-info">
                                        [[company_name]], [[full_name]], [[teacher_id]], [[teacher_designation]], [[joining_date]], [[sms_time]], [[payroll_name]], [[payroll_total]] Keywords refer by Company Name, Teacher Name, Id, Designation, Joining Date, Sms Time, Payroll Name &amp; Payroll Total respectively.
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Teacher Attendance</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-prepend input-group-text">
                                        <div>
                                            <div className="custom-control custom-switch text-left">
                                                <input
                                                    type="checkbox"
                                                    name="auto_ta_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isTaJoin1}
                                                    id="auto_ta_join"
                                                    value="1"
                                                    onChange={() => setIsTaJoin1(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="auto_ta_join">Auto</label>
                                            </div>
                                            <div className="custom-control custom-switch">
                                                <input
                                                    type="checkbox"
                                                    name="is_ta_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isTaJoin2}
                                                    id="is_ta_join"
                                                    value="1"
                                                    onChange={() => setIsTaJoin2(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="is_ta_join">Manual</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control" name="t_attendance" aria-label="With textarea" defaultValue={smsSettings[0]?.t_attendance}>

                                    </textarea>
                                    <small id="passwordHelpBlock" className="form-text text-info">
                                        [[company_name]], [[full_name]], [[employee_id]], [[employee_designation]], [[joining_date]], [[sms_time]], [[payroll_name]], [[payroll_total]] Keywords refer by Company Name, Employee Name, Id, Designation, Joining Date, Sms time, Payroll Name &amp; Payroll Total respectively.
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Teacher Out Attendance</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-prepend input-group-text">
                                        <div>
                                            <div className="custom-control custom-switch text-left">
                                                <input
                                                    type="checkbox"
                                                    name="auto_ss_attendance"
                                                    className="custom-control-input common_sms"
                                                    checked={isSsAttendance1}
                                                    id="auto_ss_attendance"
                                                    value="1"
                                                    onChange={() => setIsSsAttendance1(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="auto_ss_attendance">Auto</label>
                                            </div>
                                            <div className="custom-control custom-switch">
                                                <input
                                                    type="checkbox"
                                                    name="is_ss_attendance"
                                                    className="custom-control-input common_sms"
                                                    checked={isSsAttendance2}
                                                    id="is_ss_attendance"
                                                    value="1"
                                                    onChange={() => setIsSsAttendance2(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="is_ss_attendance">Manual</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control" name="t_out_attendance" aria-label="With textarea" defaultValue={smsSettings[0]?.t_out_attendance}>

                                    </textarea>
                                    <small id="passwordHelpBlock" className="form-text text-info">
                                        [[company_name]], [[full_name]], [[session]], [[shift]], [[class]], [[section]], [[roll]], [[admission_date]], [[sms_time]] Keywords refer by Company Name, Student Name, Session, Shift, Class, Section, Roll, Admission Date &amp; Sms time respectively.
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Employee Attendance</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-prepend input-group-text">
                                        <div>
                                            <div className="custom-control custom-switch text-left">
                                                <input
                                                    type="checkbox"
                                                    name="auto_ea_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isEaJoin1}
                                                    id="auto_ea_join"
                                                    value="1"
                                                    onChange={() => setIsEaJoin1(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="auto_ea_join">Auto</label>
                                            </div>
                                            <div className="custom-control custom-switch">
                                                <input
                                                    type="checkbox"
                                                    name="is_ea_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isEaJoin2}
                                                    id="is_ea_join"
                                                    value="1"
                                                    onChange={() => setIsEaJoin2(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="is_ea_join">Manual</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control" name="e_attendance" aria-label="With textarea" defaultValue={smsSettings[0]?.e_attendance}>

                                    </textarea>
                                    <small id="passwordHelpBlock" className="form-text text-info">
                                        [[company_name]], [[full_name]], [[teacher_id]], [[teacher_designation]], [[joining_date]], [[sms_time]], [[payroll_name]], [[payroll_total]] Keywords refer by Company Name, Teacher Name, Id, Designation, Joining Date, Sms Time, Payroll Name &amp; Payroll Total respectively.
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Employee Out Attendance</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-prepend input-group-text">
                                        <div>
                                            <div className="custom-control custom-switch text-left">
                                                <input
                                                    type="checkbox"
                                                    name="auto_eo_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isEoJoin1}
                                                    id="auto_eo_join"
                                                    value="1"
                                                    onChange={() => setIsEoJoin1(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="auto_eo_join">Auto</label>
                                            </div>
                                            <div className="custom-control custom-switch">
                                                <input
                                                    type="checkbox"
                                                    name="is_eo_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isEoJoin2}
                                                    id="is_eo_join"
                                                    value="1"
                                                    onChange={() => setIsEoJoin2(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="is_eo_join">Manual</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control" name="e_out_attendance" aria-label="With textarea" defaultValue={smsSettings[0]?.e_out_attendance}>

                                    </textarea>
                                    <small id="passwordHelpBlock" className="form-text text-info">
                                        [[company_name]], [[full_name]], [[employee_id]], [[employee_designation]], [[joining_date]], [[sms_time]], [[payroll_name]], [[payroll_total]] Keywords refer by Company Name, Employee Name, Id, Designation, Joining Date, Sms Time, Payroll Name &amp; Payroll Total respectively.
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-white m-3 shadow-sm">
                    <div className="card-header py-2 bg-light">
                        <div className="card-title mb-0 float-left font-weight-bold mt-1 text-dark ">Absence SMS</div>
                    </div>

                    <div className="card-body">
                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Student Absence</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-prepend input-group-text">
                                        <div>

                                            <div className="custom-control custom-switch text-left">
                                                <input
                                                    type="checkbox"
                                                    name="auto_sa_attendance"
                                                    className="custom-control-input common_sms"
                                                    checked={isSAAttendance1}
                                                    id="auto_sa_attendance"
                                                    value="1"
                                                    onChange={() => setIsSAAttendance1(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="auto_sa_attendance">Auto</label>
                                            </div>


                                            <div className="custom-control custom-switch">
                                                <input type="checkbox" name="is_sa_attendance" className="custom-control-input common_sms" checked={isSAAttendance2} id="is_sa_attendance" value="1" onChange={() => setIsSAAttendance2(prevState => !prevState)} />
                                                <label className="custom-control-label" htmlFor="is_sa_attendance">Manual</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control" name="s_absence" aria-label="With textarea" defaultValue={smsSettings[0]?.s_absence}>

                                    </textarea>
                                    <small id="passwordHelpBlock" className="form-text text-info">
                                        [[company_name]], [[full_name]], [[session]], [[shift]], [[class]], [[section]], [[roll]], [[admission_date]], [[sms_time]] Keywords refer by Company Name, Student Name, Session, Shift, Class, Section, Roll, Admission Date &amp; Sms time respectively.
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Teacher & Employee Absence</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-prepend input-group-text">
                                        <div >
                                            <div className="custom-control custom-switch text-left">
                                                <input
                                                    type="checkbox"
                                                    name="auto_te_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isTeJoin1}
                                                    id="auto_te_join"
                                                    value="1"
                                                    onChange={() => setIsTeJoin1(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="auto_te_join">Auto</label>
                                            </div>
                                            <div className="custom-control custom-switch">
                                                <input
                                                    type="checkbox"
                                                    name="is_oa_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isTeJoin2}
                                                    id="is_te_join"
                                                    value="1"
                                                    onChange={() => setIsTeJoin2(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="is_te_join">Manual</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control" name="te_absence" aria-label="With textarea" defaultValue={smsSettings[0]?.te_absence}>

                                    </textarea>
                                    <small id="passwordHelpBlock" className="form-text text-info">
                                        [[company_name]], [[full_name]], [[teacher_id]], [[teacher_designation]], [[joining_date]], [[sms_time]], [[payroll_name]], [[payroll_total]] Keywords refer by Company Name, Teacher Name, Id, Designation, Joining Date, Sms Time, Payroll Name &amp; Payroll Total respectively.
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="card bg-white m-3 shadow-sm">
                    <div className="card-header py-2 bg-light">
                        <div className="card-title mb-0 float-left font-weight-bold mt-1 text-dark ">Fess Collection SMS</div>
                    </div>

                    <div className="card-body">
                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Fees Collection</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-prepend input-group-text">
                                        <div>

                                            <div className="custom-control custom-switch text-left">
                                                <input
                                                    type="checkbox"
                                                    name="auto_fc_attendance"
                                                    className="custom-control-input common_sms"
                                                    checked={isFcAttendance1}
                                                    id="auto_fc_attendance"
                                                    value="1"
                                                    onChange={() => setIsFcAttendance1(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="auto_fc_attendance">Auto</label>
                                            </div>


                                            <div className="custom-control custom-switch">
                                                <input type="checkbox" name="is_fc_attendance" className="custom-control-input common_sms" checked={isFcAttendance2} id="is_fc_attendance" value="1" onChange={() => setIsFcAttendance2(prevState => !prevState)} />
                                                <label className="custom-control-label" htmlFor="is_fc_attendance">Manual</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control" name="f_collection" aria-label="With textarea" defaultValue={smsSettings[0]?.f_collection}>

                                    </textarea>
                                    <small id="passwordHelpBlock" className="form-text text-info">
                                        [[company_name]], [[full_name]], [[session]], [[shift]], [[class]], [[section]], [[roll]], [[admission_date]], [[sms_time]] Keywords refer by Company Name, Student Name, Session, Shift, Class, Section, Roll, Admission Date &amp; Sms time respectively.
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="card bg-white m-3 shadow-sm">
                    <div className="card-header py-2 bg-light">
                        <div className="card-title mb-0 float-left font-weight-bold mt-1 text-dark ">Due Fees SMS</div>
                    </div>

                    <div className="card-body">
                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Dus Fees Collection</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-prepend input-group-text">
                                        <div>

                                            <div className="custom-control custom-switch text-left">
                                                <input
                                                    type="checkbox"
                                                    name="auto_df_attendance"
                                                    className="custom-control-input common_sms"
                                                    checked={isDfAttendance1}
                                                    id="auto_df_attendance"
                                                    value="1"
                                                    onChange={() => setIsDfAttendance1(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="auto_df_attendance">Auto</label>
                                            </div>


                                            <div className="custom-control custom-switch">
                                                <input type="checkbox" name="is_df_attendance" className="custom-control-input common_sms" checked={isDfAttendance2} id="is_df_attendance" value="1" onChange={() => setIsDfAttendance2(prevState => !prevState)} />
                                                <label className="custom-control-label" htmlFor="is_df_attendance">Manual</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control" name="df_collection" aria-label="With textarea" defaultValue={smsSettings[0]?.df_collection}>

                                    </textarea>
                                    <small id="passwordHelpBlock" className="form-text text-info">
                                        [[company_name]], [[full_name]], [[session]], [[shift]], [[class]], [[section]], [[roll]], [[admission_date]], [[sms_time]] Keywords refer by Company Name, Student Name, Session, Shift, Class, Section, Roll, Admission Date &amp; Sms time respectively.
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Time</label>
                            </div>
                            <div className="col-md-9">
                                <select required name="df_time" className="form-control form-control-sm trim integer_no_zero" id="payment_date" defaultValue={smsSettings[0?.df_time]}>
                                    {[...Array(31).keys()].map((day) => (
                                        <option key={day + 1} value={day + 1}>{day + 1}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-white m-3 shadow-sm">
                    <div className="card-header py-2 bg-light">
                        <div className="card-title mb-0 float-left font-weight-bold mt-1 text-dark ">Results SMS</div>
                    </div>

                    <div className="card-body">
                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Student Result</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-prepend input-group-text">
                                        <div>

                                            <div className="custom-control custom-switch text-left">
                                                <input
                                                    type="checkbox"
                                                    name="auto_sr_attendance"
                                                    className="custom-control-input common_sms"
                                                    checked={isSrAttendance1}
                                                    id="auto_sr_attendance"
                                                    value="1"
                                                    onChange={() => setIsSrAttendance1(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="auto_sr_attendance">Auto</label>
                                            </div>


                                            <div className="custom-control custom-switch">
                                                <input type="checkbox" name="is_sr_attendance" className="custom-control-input common_sms" checked={isSrAttendance2} id="is_sr_attendance" value="1" onChange={() => setIsSrAttendance2(prevState => !prevState)} />
                                                <label className="custom-control-label" htmlFor="is_sr_attendance">Manual</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control" name="s_result" aria-label="With textarea" defaultValue={smsSettings[0]?.s_result}>

                                    </textarea>
                                    <small id="passwordHelpBlock" className="form-text text-info">
                                        [[company_name]], [[full_name]], [[session]], [[shift]], [[class]], [[section]], [[roll]], [[admission_date]], [[sms_time]] Keywords refer by Company Name, Student Name, Session, Shift, Class, Section, Roll, Admission Date &amp; Sms time respectively.
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="card bg-white m-3 shadow-sm">
                    <div className="card-header py-2 bg-light">
                        <div className="card-title mb-0 float-left font-weight-bold mt-1 text-dark ">Salary SMS</div>
                    </div>

                    <div className="card-body">
                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Teacher Salary</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-prepend input-group-text">
                                        <div>

                                            <div className="custom-control custom-switch text-left">
                                                <input
                                                    type="checkbox"
                                                    name="auto_ts_attendance"
                                                    className="custom-control-input common_sms"
                                                    checked={isTsAttendance1}
                                                    id="auto_ts_attendance"
                                                    value="1"
                                                    onChange={() => setIsTsAttendance1(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="auto_ts_attendance">Auto</label>
                                            </div>


                                            <div className="custom-control custom-switch">
                                                <input type="checkbox" name="is_ts_attendance" className="custom-control-input common_sms" checked={isTsAttendance2} id="is_ts_attendance" value="1" onChange={() => setIsTsAttendance2(prevState => !prevState)} />
                                                <label className="custom-control-label" htmlFor="is_ts_attendance">Manual</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control" name="t_salary" aria-label="With textarea" defaultValue={smsSettings[0]?.t_salary}>

                                    </textarea>
                                    <small id="passwordHelpBlock" className="form-text text-info">
                                        [[company_name]], [[full_name]], [[session]], [[shift]], [[class]], [[section]], [[roll]], [[admission_date]], [[sms_time]] Keywords refer by Company Name, Student Name, Session, Shift, Class, Section, Roll, Admission Date &amp; Sms time respectively.
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="row no-gutters mb-3">
                            <div className="col-md-3">
                                <label className="font-weight-bold text-right text-dark">Employee Salary</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <div className="input-group-prepend input-group-text">
                                        <div >
                                            <div className="custom-control custom-switch text-left">
                                                <input
                                                    type="checkbox"
                                                    name="auto_es_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isEsJoin1}
                                                    id="auto_es_join"
                                                    value="1"
                                                    onChange={() => setIsEsJoin1(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="auto_es_join">Auto</label>
                                            </div>
                                            <div className="custom-control custom-switch">
                                                <input
                                                    type="checkbox"
                                                    name="is_es_join"
                                                    className="custom-control-input common_sms"
                                                    checked={isEsJoin2}
                                                    id="is_es_join"
                                                    value="1"
                                                    onChange={() => setIsEsJoin2(prevState => !prevState)}
                                                />
                                                <label className="custom-control-label" htmlFor="is_es_join">Manual</label>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control" name="e_salary" aria-label="With textarea" defaultValue={smsSettings[0]?.e_salary}>

                                    </textarea>
                                    <small id="passwordHelpBlock" className="form-text text-info">
                                        [[company_name]], [[full_name]], [[teacher_id]], [[teacher_designation]], [[joining_date]], [[sms_time]], [[payroll_name]], [[payroll_total]] Keywords refer by Company Name, Teacher Name, Id, Designation, Joining Date, Sms Time, Payroll Name &amp; Payroll Total respectively.
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="row no-gutters mb-2">
                    <div className=" offset-md-3">
                        <input type="submit" name="create" className="btn btn-sm btn-success" value="Submit" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdmissionSMS;
