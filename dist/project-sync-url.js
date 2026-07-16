/**
 * Lightweight project poll endpoint (minimal Postgres columns). Use instead of
 * `GET /api/projects/[id]` for recurring polling to reduce database egress.
 */
export function projectPollSyncUrl(projectId) {
    return `/api/projects/${encodeURIComponent(projectId)}/sync`;
}
