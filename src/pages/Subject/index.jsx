import axios from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Subject() {
    let { subjectId } = useParams();
    const [subject, setSubject] = useState()
    const [students, setStudents] = useState([])
    const [allStudent, setAllStudent] = useState([])
    const [attendanceStudents, setAttendanceStudents] = useState([])
    const getSubjectById = async (id) => {
        const res = await axios.get(`http://localhost:8000/subjects/${id}`)
        setSubject(res.data)
    }
    const getStudents = async () => {
        const res = await axios.get(`http://localhost:8000/students`)
        setStudents(res.data)
    }

    const getStudentsAttendanceInSubject = async (id) => {
        const res = await axios.get(`http://localhost:8000/attendances/students/${id}`)
        setAttendanceStudents(res.data)
    }

    const markAttendanceStatus = () => {
        const attendanceMap = new Map();

        attendanceStudents.forEach(student => {
            attendanceMap.set(student.student_id, student.attended_at);
        });

        const markedStudents = students.map(student => ({
            ...student,
            isAttendance: attendanceMap.has(student.student_id) ? true : false,
            attended_at: attendanceMap.get(student.student_id) != null ? format(new Date(attendanceMap.get(student.student_id)), 'dd-MM-yyyy HH:mm:ss') : null
        }));

        setAllStudent(markedStudents)
    };


    useEffect(() => {
        getSubjectById(subjectId)
        getStudents()
        getStudentsAttendanceInSubject(subjectId)
    }, [subjectId])

    useEffect(() => {
        markAttendanceStatus()
    }, [students, attendanceStudents])

    useEffect(() => {

    })
    return (
        <div>
            <img style={{ width: '100px', height: '100px' }} src={subject?.thumbnail} />
            <h1>{subject?.name}</h1>
            <table style={{ marginTop: '30px' }} className="table">
                <thead>
                    <tr>
                        <th scope="col">Tên</th>
                        <th scope="col">Mã Sinh Viên</th>
                        <th scope="col">Trạng Thái</th>
                        <th scope="col">Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allStudent.map((student) => (
                            <tr key={student.id}>
                                <th scope="row">{student.name}</th>
                                <td>{student.student_id}</td>
                                <td>{student.isAttendance ? <div className="btn btn-success">Có</div> : <div className="btn btn-danger">Vắng</div>}</td>
                                <td>{student.attended_at}</td>
                            </tr>
                        ))
                    }
                    
                </tbody>

            </table>
        </div>

    )
}

export default Subject