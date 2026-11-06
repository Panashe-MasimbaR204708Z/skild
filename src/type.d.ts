 interface SkillRecord {
    id: string,
    title: string,
    description: string,
    category: string,
    tags: string[],
    installCommand: string,
    createdAt: string,
    authorClerkId: string,
    authorEmail: string,
    upvoteCount?: number,
    commentCount?: number,
 }