export function getInitials(name: string | undefined): string | undefined {
    const nameParts = name?.split(' ');
    let initials: string[] = [];
  
    if (nameParts && nameParts.length > 0) {
      initials.push(nameParts[0].charAt(0));
  
      if (nameParts.length > 1) {
        initials.push(nameParts[nameParts.length - 1].charAt(0));
      }
    }
    return initials?.join('');
  }