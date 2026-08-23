import { useEffect, useState } from 'react';
import axios from 'axios';

export default function History({ onBack }) {
  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/history`
        );

        setMeetings(response.data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Unable to load meeting history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const openMeeting = async (id) => {
    try {
      setError('');

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/history/${id}`
      );

      setSelectedMeeting(response.data);
    } catch (err) {
      console.error(err);
      setError('Unable to load this meeting.');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '100px 24px',
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '50px',
        }}
      >
        <h2
          style={{
            fontSize: '44px',
            marginBottom: '14px',
          }}
        >
          Meeting{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #F59E0B, #FDBA74)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontStyle: 'italic',
            }}
          >
            History
          </span>
        </h2>

        <p
          style={{
            color: 'var(--color-muted)',
            fontSize: '16px',
          }}
        >
          Review your previously analyzed meetings.
        </p>
      </div>

      {/* Error */}
      {error && (
        <p
          style={{
            color: 'var(--color-danger)',
            textAlign: 'center',
            marginBottom: '30px',
          }}
        >
          {error}
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div
          style={{
            textAlign: 'center',
            color: 'var(--color-muted)',
            padding: '60px',
          }}
        >
          Loading meetings...
        </div>
      )}

      {/* Empty history */}
      {!loading && !meetings.length && !error && (
        <div
          style={{
            textAlign: 'center',
            padding: '70px 20px',
            border: '1px solid var(--color-border)',
            borderRadius: '20px',
            background: 'var(--color-card)',
          }}
        >
          <div
            style={{
              fontSize: '42px',
              marginBottom: '15px',
            }}
          >
            📂
          </div>

          <h3
            style={{
              marginBottom: '10px',
            }}
          >
            No meetings yet
          </h3>

          <p
            style={{
              color: 'var(--color-muted)',
              marginBottom: '25px',
            }}
          >
            Analyze your first meeting and it will appear here.
          </p>

          <button
            onClick={onBack}
            style={{
              background:
                'linear-gradient(90deg, #F59E0B, #FDBA74)',
              color: '#0F0F0F',
              border: 'none',
              borderRadius: '999px',
              padding: '12px 24px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Analyze a Meeting →
          </button>
        </div>
      )}

      {/* Meeting list */}
      {!loading && meetings.length > 0 && !selectedMeeting && (
        <div
          style={{
            display: 'grid',
            gap: '16px',
          }}
        >
          {meetings.map((meeting) => (
            <button
              key={meeting.id}
              onClick={() => openMeeting(meeting.id)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '22px',
                borderRadius: '18px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-card)',
                color: 'var(--color-text)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform =
                  'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform =
                  'translateY(0)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '20px',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      color: 'var(--color-muted)',
                      fontSize: '12px',
                      marginBottom: '8px',
                    }}
                  >
                    Meeting #{meeting.id} ·{' '}
                    {formatDate(meeting.created_at)}
                  </div>

                  <div
                    style={{
                      fontSize: '17px',
                      fontWeight: 600,
                      lineHeight: 1.5,
                    }}
                  >
                    {meeting.summary ||
                      'No summary available.'}
                  </div>
                </div>

                <span
                  style={{
                    color: 'var(--color-sage)',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  View →
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Selected meeting */}
      {selectedMeeting && (
        <div>
          {/* Back button */}
          <button
            onClick={() => setSelectedMeeting(null)}
            style={{
              background: 'transparent',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              borderRadius: '999px',
              padding: '9px 18px',
              cursor: 'pointer',
              marginBottom: '25px',
            }}
          >
            ← Back to History
          </button>

          <div
            style={{
              display: 'grid',
              gap: '20px',
            }}
          >
            {/* Meeting information */}
            <Section title="Meeting Information">
              <p
                style={{
                  color: 'var(--color-muted)',
                  margin: 0,
                }}
              >
                Meeting #{selectedMeeting.id}
                <br />
                {formatDate(selectedMeeting.created_at)}
              </p>
            </Section>

            {/* Transcript */}
            <Section title="Transcript">
              <p
                style={{
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {selectedMeeting.transcript}
              </p>
            </Section>

            {/* Summary */}
            <Section title="Summary">
              {selectedMeeting.summary}
            </Section>

            {/* Action items */}
            <Section title="Action Items">
              {selectedMeeting.action_items?.length ? (
                <ul
                  style={{
                    paddingLeft: '20px',
                  }}
                >
                  {selectedMeeting.action_items.map(
                    (item, index) => (
                      <li
                        key={index}
                        style={{
                          marginBottom: '10px',
                        }}
                      >
                        <strong
                          style={{
                            color: 'var(--color-text)',
                          }}
                        >
                          {item.task}
                        </strong>

                        {item.owner && (
                          <span
                            style={{
                              color: 'var(--color-sage)',
                            }}
                          >
                            {' '}
                            — {item.owner}
                          </span>
                        )}

                        {item.deadline && (
                          <span
                            style={{
                              color: 'var(--color-peach)',
                            }}
                          >
                            {' '}
                            ({item.deadline})
                          </span>
                        )}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                'No action items found.'
              )}
            </Section>

            {/* Decisions */}
            <Section title="Decisions">
              {selectedMeeting.decisions?.length ? (
                <ul
                  style={{
                    paddingLeft: '20px',
                  }}
                >
                  {selectedMeeting.decisions.map(
                    (decision, index) => (
                      <li
                        key={index}
                        style={{
                          marginBottom: '8px',
                        }}
                      >
                        {decision}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                'No decisions recorded.'
              )}
            </Section>

            {/* Risks */}
            <Section title="Risks">
              {selectedMeeting.risks?.length ? (
                <ul
                  style={{
                    paddingLeft: '20px',
                  }}
                >
                  {selectedMeeting.risks.map(
                    (risk, index) => (
                      <li
                        key={index}
                        style={{
                          marginBottom: '8px',
                        }}
                      >
                        {risk}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                'No risks identified.'
              )}
            </Section>
          </div>
        </div>
      )}
    </div>
  );
}


/* Reusable section component */
function Section({ title, children }) {
  return (
    <div
      style={{
        padding: '24px',
        borderRadius: '18px',
        border: '1px solid var(--color-border)',
        background: 'var(--color-card)',
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: '15px',
          fontSize: '18px',
        }}
      >
        {title}
      </h3>

      <div
        style={{
          color: 'var(--color-muted)',
          lineHeight: 1.7,
        }}
      >
        {children}
      </div>
    </div>
  );
}