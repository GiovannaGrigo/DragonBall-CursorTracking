export function getDragonBallImage(
  stars: number
): string {
  if (stars === 1) {
    return 'assets/images/dragon-balls/esfera-1-estrela.png';
  }

  return `assets/images/dragon-balls/esfera-${stars}-estrelas.png`;
}