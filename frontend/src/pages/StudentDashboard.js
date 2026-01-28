import React, { useEffect, useState } from 'react';
import axios from 'axios';

const gradeColor = (grade) => {
  switch (grade) {
    case 'A': return 'text-green-600 font-bold';
    case 'B': return 'text-green-500 font-bold';
    case 'C': return 'text-yellow-600 font-bold';
    case 'D': return 'text-orange-600 font-bold';
    case 'F': return 'text-red-600 font-bold';
    default: return '';
  }
};

const TERMS = ['1st Term', '2nd Term', '3rd Term'];

export default function StudentDashboard() {
  const [results, setResults] = useState([]);
  const [student, setStudent] = useState({});
  const [term, setTerm] = useState('2nd Term');
  const [session, setSession] = useState('');
  const [sessions, setSessions] = useState([]);
  const [teacherRemark, setTeacherRemark] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Fetch sessions on mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/sessions')
      .then(res => {
        setSessions(res.data || []);
        if ((res.data || []).length && !session) {
          // Default to the last session assuming it's the most recent
          const last = res.data[res.data.length - 1];
          if (last?.name) setSession(last.name);
        }
      })
      .catch(() => setSessions([]));
  }, []);

  useEffect(() => {
    // Get student info from localStorage
    const studentData = localStorage.getItem('student');
    if (!studentData) return;
    const studentObj = JSON.parse(studentData);
    setStudent(studentObj);
    if (!session) return;
    axios.get(`http://localhost:5000/api/student/${studentObj.student_id}/result?term=${term}&session=${session}`)
      .then(res => setResults(res.data))
      .catch(err => {
        let msg = 'Could not load results. Please check your connection or contact admin.';
        if (err.response && err.response.data && err.response.data.message) {
          msg = err.response.data.message;
        } else if (err.message) {
          msg = err.message;
        }
        alert(msg);
        setResults([]);
        console.error(err);
      });
    // Fetch teacher's remark
    axios.get(`http://localhost:5000/api/remarks?student_id=${studentObj.student_id}&class=${studentObj.class}&term=${term}&session=${session}`)
      .then(res => setTeacherRemark(res.data?.remark || ''))
      .catch(() => setTeacherRemark(''));
  }, [term, session]);

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.pageYOffset > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Poll for teacher remark periodically to reflect real-time updates
  useEffect(() => {
    const studentData = localStorage.getItem('student');
    if (!studentData || !session) return;
    const studentObj = JSON.parse(studentData);
    const intervalId = setInterval(() => {
      axios.get(`http://localhost:5000/api/remarks?student_id=${studentObj.student_id}&class=${studentObj.class}&term=${term}&session=${session}`)
        .then(res => setTeacherRemark(res.data?.remark || ''))
        .catch(() => {});
    }, 4000);
    return () => clearInterval(intervalId);
  }, [term, session]);

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.pageYOffset > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Calculate grand total and average based on components (CA1+CA2+Exam)
  const grandTotal = results.reduce((sum, r) => {
    const ca1 = Number(r.ca1) || 0;
    const ca2 = Number(r.ca2) || 0;
    const exam = Number(r.score) || 0;
    return sum + ca1 + ca2 + exam;
  }, 0);
  const average = results.length ? (grandTotal / results.length).toFixed(1) : 0;
  const position = 5; // Placeholder
  const remark = average >= 70 ? 'Excellent' : average >= 50 ? 'Good' : 'Needs Improvement';

  // Avatar initials
  const initials = student.fullname ? student.fullname.split(' ').map(n => n[0]).join('').toUpperCase() : '';

  // Resolve student photo URL for img src. Handles paths like:
  // - 'backend/uploads/photos/...' (stored by multer on Windows)
  // - 'uploads/photos/...' (already relative)
  // - '/uploads/photos/...' (leading slash)
  // - absolute URLs
  const resolvePhotoUrl = (photoPath) => {
    if (!photoPath) return null;
    const trimmed = String(photoPath).trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    // Remove any leading 'backend/' segment which some endpoints store
    let p = trimmed.replace(/^backend\//, '');
    // Ensure no leading slash duplication
    if (p.startsWith('/')) p = p.slice(1);
    return `http://localhost:5000/${p}`;
  };

  // Debug log for results
  console.log('Student results:', results);
  const hasExam = results.some(r => r.score !== null && r.score !== undefined && String(r.score).trim() !== '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Bar */}
      <header className="bg-mubito-maroon text-white px-4 md:px-8 py-4 shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            {student.photo ? (
              <img
                src={resolvePhotoUrl(student.photo)}
                alt="Passport"
                onError={(e) => { e.target.onerror = null; e.target.src = '/images.jpg'; }}
                className="w-12 h-12 md:w-16 md:h-16 rounded object-cover border-2 border-white bg-white flex-shrink-0"
              />
            ) : (
              <div className="bg-white text-mubito-maroon rounded-full w-12 h-12 flex items-center justify-center text-lg md:text-xl font-bold border-2 border-white flex-shrink-0">
                {initials}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="font-bold text-base md:text-lg">
                Welcome, {student.fullname} <span className="text-gray-200 text-xs md:text-sm block md:inline">({student.class})</span>
              </div>
              <div className="text-xs md:text-sm text-gray-200">Session: {session} | Term: {term}</div>
            </div>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6">
            <span className="font-extrabold text-lg md:text-2xl tracking-wide">Mubito School</span>
            <button className="bg-mubito-maroon-dark hover:bg-mubito-maroon-light px-4 py-2 rounded text-white font-semibold text-sm md:text-base min-h-[44px]" onClick={() => { localStorage.clear(); window.location = '/'; }}>Logout</button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto mt-4 md:mt-8 p-4">
        {/* Term/Session Selector */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
            <label className="font-semibold text-mubito-navy text-sm md:text-base">Session:</label>
            <select value={session} onChange={e => setSession(e.target.value)} className="p-2 rounded border-mubito-maroon border focus:outline-none flex-1 sm:flex-initial min-h-[44px]">
              {sessions.map(s => <option key={s.id || s.name} value={s.name}>{s.name}</option>)}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
            <label className="font-semibold text-mubito-navy text-sm md:text-base">Term:</label>
            <select value={term} onChange={e => setTerm(e.target.value)} className="p-2 rounded border-mubito-maroon border focus:outline-none flex-1 sm:flex-initial min-h-[44px]">
              {TERMS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        {/* Summary Card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className="bg-mubito-navy-light bg-opacity-10 rounded shadow p-3 md:p-4 text-center">
            <div className="text-mubito-navy text-xs md:text-sm">Total</div>
            <div className="text-xl md:text-2xl font-bold text-mubito-navy-dark">{grandTotal}</div>
          </div>
          <div className="bg-mubito-navy-light bg-opacity-10 rounded shadow p-3 md:p-4 text-center">
            <div className="text-mubito-navy text-xs md:text-sm">Average</div>
            <div className="text-xl md:text-2xl font-bold text-mubito-navy-dark">{average}</div>
          </div>
          <div className="bg-mubito-navy-light bg-opacity-10 rounded shadow p-3 md:p-4 text-center">
            <div className="text-mubito-navy text-xs md:text-sm">Position</div>
            <div className="text-xl md:text-2xl font-bold text-mubito-navy-dark">{position}th</div>
          </div>
          <div className="bg-mubito-navy-light bg-opacity-10 rounded shadow p-3 md:p-4 text-center">
            <div className="text-mubito-navy text-xs md:text-sm">Remark</div>
            <div className="text-xl md:text-2xl font-bold text-mubito-navy-dark break-words">{remark}</div>
          </div>
        </div>

        {/* Class Teacher's Remark */}
        <div className="bg-white rounded shadow p-4 md:p-6 mb-6">
          <div className="text-mubito-navy font-semibold mb-2 text-sm md:text-base">Class Teacher's Remark</div>
          <div className="text-gray-900 whitespace-pre-wrap text-sm md:text-base">{teacherRemark || '—'}</div>
        </div>

        {/* Results Table */}
        {results.length === 0 ? (
          <div className="text-center text-red-600 font-bold my-8">
            Your results are pending approval by the admin. Please check back later.
          </div>
        ) : (
          <div className="bg-white rounded shadow overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-mubito-navy-light bg-opacity-20">
                  <tr>
                    <th className="py-2 px-4 text-left text-mubito-navy-dark text-xs md:text-sm">Subject</th>
                    <th className="py-2 px-4 text-left text-mubito-navy-dark text-xs md:text-sm">CA1</th>
                    <th className="py-2 px-4 text-left text-mubito-navy-dark text-xs md:text-sm">CA2</th>
                    <th className="py-2 px-4 text-left text-mubito-navy-dark text-xs md:text-sm">Exam</th>
                    <th className="py-2 px-4 text-left text-mubito-navy-dark text-xs md:text-sm">Total</th>
                    {hasExam && <th className="py-2 px-4 text-left text-mubito-navy-dark text-xs md:text-sm">Grade</th>}
                    <th className="py-2 px-4 text-left text-mubito-navy-dark text-xs md:text-sm">Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => {
                    const ca1 = Number(r.ca1) || 0;
                    const ca2 = Number(r.ca2) || 0;
                    const exam = Number(r.score) || 0;
                    const total = ca1 + ca2 + exam;
                    return (
                      <tr key={r.subject} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="py-2 px-4 text-xs md:text-sm">{r.subject}</td>
                        <td className="py-2 px-4 text-xs md:text-sm">{r.ca1}</td>
                        <td className="py-2 px-4 text-xs md:text-sm">{r.ca2}</td>
                        <td className="py-2 px-4 text-xs md:text-sm">{r.score}</td>
                        <td className="py-2 px-4 text-xs md:text-sm">{total}</td>
                        {hasExam && <td className={`py-2 px-4 text-xs md:text-sm ${gradeColor(r.grade)}`}>{r.grade}</td>}
                        <td className="py-2 px-4 text-xs md:text-sm">{r.remark}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Download Button */}
        <div className="flex flex-col items-center mt-6 mb-8">
          <img src="/images.jpg" alt="School Logo" className="w-16 h-16 md:w-24 md:h-24 object-contain mb-3" />
          <button
            className="bg-mubito-maroon hover:bg-mubito-maroon-light text-white px-6 py-3 rounded font-semibold shadow min-h-[44px] w-full sm:w-auto text-sm md:text-base"
            onClick={() => window.open(`http://localhost:5000/api/student/${student.student_id}/result/pdf?term=${term}&session=${session}`)}
          >
            🔽 Download Result as PDF
          </button>
        </div>
      </main>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-mubito-maroon hover:bg-mubito-maroon-light text-white rounded-full p-4 shadow-lg transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-mubito-maroon hover:bg-mubito-maroon-light text-white rounded-full p-4 shadow-lg transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}