import { useEffect, useMemo, useState } from 'react'

type Screen = 'Today' | 'Task detail' | 'Capture' | 'Review'
type DeliveryMode = 'Live' | 'Screenshots'

const journey: Array<{ page: Screen; number: string; title: string; summary: string }> = [
  { page: 'Task detail', number: '01', title: 'Shape the experience', summary: 'Choose a focused journey and disclose what is simulated.' },
  { page: 'Capture', number: '02', title: 'Prepare the repository', summary: 'Capture and validate every declared review page locally.' },
  { page: 'Review', number: '03', title: 'Publish for review', summary: 'Push the verified revision, then review it in Mission Surface.' },
]

const pageOrder: Screen[] = ['Today', 'Task detail', 'Capture', 'Review']

export default function App() {
  const [screen, setScreen] = useState<Screen>('Today')
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('Live')
  const [completed, setCompleted] = useState<string[]>(['Define one audience'])
  const [showSuccess, setShowSuccess] = useState(false)

  const bridge = useMemo(() => {
    const query = new URLSearchParams(window.location.search)
    if (query.get('msProtocol') !== 'mission-surface-prototype' || query.get('msVersion') !== '1' || query.get('msPrototype') !== 'mobile-sample' || !query.get('msChannel') || !query.get('msParentOrigin')) return null
    const parentOrigin = new URL(query.get('msParentOrigin') as string).origin
    if (parentOrigin !== 'https://missionsurface.com' && !/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(parentOrigin)) return null
    return { channel: query.get('msChannel'), parentOrigin }
  }, [])

  useEffect(() => {
    if (!bridge) return
    const postReady = () => window.parent.postMessage({ protocol: 'mission-surface-prototype', version: 1, channel: bridge.channel, prototypeKey: 'mobile-sample', type: 'ready', page: screen }, bridge.parentOrigin)
    postReady()
    const retryTimers = [250, 1000].map((delay) => window.setTimeout(postReady, delay))
    return () => retryTimers.forEach(window.clearTimeout)
  }, [bridge])

  useEffect(() => {
    if (!bridge) return
    window.parent.postMessage({ protocol: 'mission-surface-prototype', version: 1, channel: bridge.channel, prototypeKey: 'mobile-sample', type: 'page', page: screen }, bridge.parentOrigin)
  }, [bridge, screen])

  const toggleComplete = (label: string) => {
    setCompleted((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label])
  }

  const progress = Math.min(100, Math.round((completed.length / 5) * 100))
  const goBack = () => setScreen(pageOrder[Math.max(0, pageOrder.indexOf(screen) - 1)])

  return (
    <main className="stage">
      <div className="disclosure"><span className="disclosure-dot" /> <strong>Simulated experience</strong><span>Fixture content · No data is saved</span></div>
      <article className="phone-shell">
        <header className="app-header">
          <button className="brand" onClick={() => setScreen('Today')} aria-label="Go to Today"><span>MS</span></button>
          <div className="brand-copy"><strong>Prototype Studio</strong><span>Guided workspace</span></div>
          <button className="avatar" aria-label="Fixture profile">PD</button>
        </header>

        <div className="screen-progress" aria-label={`Journey ${progress}% complete`}><span style={{ width: `${progress}%` }} /></div>

        <section className="screen" key={screen}>
          {screen !== 'Today' && <button className="text-button back-button" onClick={goBack}><span>←</span> Back</button>}

          {screen === 'Today' && (
            <>
              <div className="hero">
                <div className="eyebrow"><span className="live-dot" /> PROTOTYPING PLAYBOOK</div>
                <h1>Take an idea from brief to review.</h1>
                <p>Build a focused, fixture-only experience and make every review state easy to understand.</p>
                <button className="primary-button hero-button" onClick={() => setScreen('Task detail')}>Continue your walkthrough <span>→</span></button>
                <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
              </div>

              <div className="metrics" aria-label="Prototype summary">
                <div><strong>3</strong><span>stages</span></div>
                <div><strong>{progress}%</strong><span>ready</span></div>
                <div><strong>1</strong><span>journey</span></div>
              </div>

              <div className="section-heading"><div><span>YOUR PATH</span><h2>How the workflow fits together</h2></div><span className="time-chip">~8 min</span></div>
              <div className="journey-list">
                {journey.map((item, index) => (
                  <button className="journey-card" key={item.page} onClick={() => setScreen(item.page)}>
                    <span className={`step-number ${index === 0 ? 'current' : ''}`}>{item.number}</span>
                    <span className="journey-copy"><strong>{item.title}</strong><small>{item.summary}</small></span>
                    <span className="card-arrow">→</span>
                  </button>
                ))}
              </div>
              <aside className="tip-card"><span className="tip-icon">✦</span><div><strong>Keep it intentionally small</strong><p>Prototype the decision you need to learn about—not the entire product.</p></div></aside>
            </>
          )}

          {screen === 'Task detail' && (
            <>
              <div className="step-kicker"><span>STEP 1 OF 3</span><span>Shape</span></div>
              <h1>Start with the experience.</h1>
              <p className="lead">Define one meaningful journey before you touch the interface. A clear boundary makes feedback useful.</p>

              <div className="panel">
                <div className="panel-heading"><span className="panel-icon purple">01</span><div><strong>Choose a delivery mode</strong><small>How should reviewers experience it?</small></div></div>
                <div className="segmented-control">
                  {(['Live', 'Screenshots'] as DeliveryMode[]).map((mode) => <button key={mode} className={deliveryMode === mode ? 'selected' : ''} onClick={() => setDeliveryMode(mode)}><span>{mode === 'Live' ? '◉' : '▣'}</span>{mode}</button>)}
                </div>
                <div className="mode-explainer"><strong>{deliveryMode === 'Live' ? 'Interactive journey' : 'Private image review'}</strong><p>{deliveryMode === 'Live' ? 'Use for working transitions and decisions. Only fixture data belongs in the public bundle.' : 'Use for private visual concepts. Map one static image to every declared page.'}</p></div>
              </div>

              <div className="panel compact-panel">
                <div className="panel-heading"><span className="panel-icon mint">02</span><div><strong>Write the boundary</strong><small>Tap each item as you define it</small></div></div>
                {['Define one audience', 'Name the primary action', 'List the simulation limits'].map((label) => (
                  <button className="check-row" key={label} onClick={() => toggleComplete(label)}><span className={completed.includes(label) ? 'check checked' : 'check'}>{completed.includes(label) ? '✓' : ''}</span><span>{label}</span></button>
                ))}
              </div>
              <button className="primary-button full-button" onClick={() => setScreen('Capture')}>Prepare the repository <span>→</span></button>
            </>
          )}

          {screen === 'Capture' && (
            <>
              <div className="step-kicker"><span>STEP 2 OF 3</span><span>Prepare</span></div>
              <h1>Capture and validate locally.</h1>
              <p className="lead">Mission Surface reads committed files through GitHub. It never runs your repository code.</p>

              <div className="terminal-card">
                <div className="terminal-top"><span><i /><i /><i /></span><small>PowerShell · repository root</small></div>
                <code><span>PS</span> powershell.exe -NoProfile<br />&nbsp;&nbsp; -ExecutionPolicy Bypass<br />&nbsp;&nbsp; -File .\prepare-and-validate.ps1</code>
                <button onClick={() => toggleComplete('Run local validation')}>{completed.includes('Run local validation') ? '✓ Validation marked complete' : 'Mark validation complete'}</button>
              </div>

              <div className="validation-list">
                <div><span className="validation-icon">1</span><div><strong>Capture</strong><small>Generate PNG, JPEG, or WebP artifacts locally.</small></div></div>
                <div><span className="validation-icon">2</span><div><strong>Validate</strong><small>Confirm every page maps exactly once and in order.</small></div></div>
                <div><span className="validation-icon">3</span><div><strong>Inspect</strong><small>Review the build and changed files before committing.</small></div></div>
              </div>

              <div className="callout"><span>i</span><p><strong>Mission Surface stays read-only.</strong> Capture, build, commit, and push all happen in your local workflow.</p></div>
              <button className="primary-button full-button" onClick={() => setScreen('Review')}>Move to review <span>→</span></button>
            </>
          )}

          {screen === 'Review' && (
            <>
              <div className="step-kicker"><span>STEP 3 OF 3</span><span>Review</span></div>
              <h1>Publish a revision reviewers can trust.</h1>
              <p className="lead">Commit the validated artifacts, push the revision, and let Mission Surface verify the catalogue.</p>

              <div className="repository-card">
                <div className="repo-mark">GH</div><div><span>PRIVATE REPOSITORY</span><strong>team / prototype-workspace</strong><small>main · fixture-only content</small></div><span className="status-pill">Connected</span>
              </div>

              <div className="review-checks">
                <button onClick={() => toggleComplete('Commit artifacts')}><span className={completed.includes('Commit artifacts') ? 'check checked' : 'check'}>{completed.includes('Commit artifacts') ? '✓' : ''}</span><div><strong>Commit the reviewed artifacts</strong><small>Keep capture source outside the public bundle.</small></div></button>
                <button onClick={() => toggleComplete('Verify revision')}><span className={completed.includes('Verify revision') ? 'check checked' : 'check'}>{completed.includes('Verify revision') ? '✓' : ''}</span><div><strong>Verify the deployed revision</strong><small>Pages metadata must match the selected commit.</small></div></button>
              </div>

              <div className="review-boundary"><span className="tip-icon">✦</span><div><strong>Approval means target UX</strong><p>It does not imply production readiness, security approval, or integration completeness.</p></div></div>

              {showSuccess ? <div className="success-state"><span>✓</span><div><strong>Ready for a focused review</strong><small>Your simulated walkthrough is prepared for stakeholder feedback.</small></div></div> : <button className="primary-button full-button" onClick={() => setShowSuccess(true)}>Preview review state <span>→</span></button>}
              <button className="secondary-button" onClick={() => setScreen('Today')}>Return to the playbook</button>
            </>
          )}
        </section>

        <nav className="bottom-nav" aria-label="Prototype guide">
          <button className={screen === 'Today' ? 'active' : ''} onClick={() => setScreen('Today')}><span className="nav-icon">⌂</span><small>Today</small></button>
          <button className={screen === 'Task detail' || screen === 'Capture' ? 'active' : ''} onClick={() => setScreen('Task detail')}><span className="nav-icon">☷</span><small>Guide</small></button>
          <button className={screen === 'Review' ? 'active' : ''} onClick={() => setScreen('Review')}><span className="nav-icon">✓</span><small>Review</small></button>
        </nav>
      </article>
    </main>
  )
}
