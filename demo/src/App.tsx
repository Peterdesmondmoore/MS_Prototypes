import { useEffect, useMemo, useState } from 'react'

type Screen = 'Today' | 'Task detail'

export default function App() {
  const [screen, setScreen] = useState<Screen>('Today')
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

  return <main><div className="limits"><strong>Simulated experience</strong><span>Fixture data · Simulated authentication · Changes are not persisted</span></div><article className="phone"><header><b>MS</b><span>Mobile Sample</span></header><section><small>{screen === 'Today' ? 'FRIDAY · 15 AUGUST' : 'PRIORITY TASK'}</small><h1>{screen === 'Today' ? 'Today' : 'Confirm field readiness'}</h1><p>{screen === 'Today' ? 'Three priorities need attention.' : 'Use realistic fixture evidence to make the intended decision clear.'}</p>{screen === 'Today' ? <button className="card" onClick={() => setScreen('Task detail')}><span><strong>Confirm field readiness</strong><em>Due today</em></span><b>→</b></button> : <><div className="evidence"><strong>Latest evidence</strong><p>Readiness increased after the latest rehearsal.</p></div><button className="back" onClick={() => setScreen('Today')}>← Back to Today</button></>}</section><nav><button className="active">Today</button><button>Tasks</button><button>More</button></nav></article></main>
}
