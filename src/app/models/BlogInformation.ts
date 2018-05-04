export class BlogInformation {
  public hash: string;
  public name: string;
  public description: string;
  public url: string;


  constructor(hash: string, name: string, description: string, url: string) {
    this.hash = hash;
    this.name = name;
    this.description = description;
    this.url = url;
  }
}
