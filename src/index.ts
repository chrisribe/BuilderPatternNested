import "./styles.css";

class Data {
  id: string;
  dateTime: Date;
  contact: Contact;
}
class Contact {
  name: string;
  surname: string;
}

class BaseBuilder {
  protected _ver: string;
  setVersion(v: string) {
    this._ver = v;
    return this;
  }
}

class ContactBuilder {
  private _dataBuilder: DataBuilder;

  //Decorator pattern:
  //Uses reference of external builder to add to it.
  constructor(dataBuilder: DataBuilder) {
    this._dataBuilder = dataBuilder;
  }
  getContactRef() {
    if (this._dataBuilder._contact == null) {
      this._dataBuilder._contact = new Contact();
    }
    return this._dataBuilder._contact;
  }

  setName(name: string) {
    let contact = this.getContactRef();
    contact.name = name;
    return this._dataBuilder;
  }

  setSurname(surname: string) {
    let contact = this.getContactRef();
    contact.surname = surname;
    return this._dataBuilder;
  }
}

//Extends example of class inheritence
class DataBuilder extends BaseBuilder {
  private _data: Data;

  public contact: ContactBuilder;
  public _contact: Contact; //<< var set by ContactBuilder while decorating

  constructor() {
    super();
    this._data = new Data();
    //Decorator pattern: This builder adds to 'this'
    this.contact = new ContactBuilder(this);
  }

  setDatetime(dateTime: Date) {
    this._data.dateTime = dateTime;
    return this;
  }
  setId(id: string) {
    this._data.id = id;
    return this;
  }

  build() {
    return {
      id: this._data.id,
      contact: this._contact,
      date: this._data.dateTime,
      ver: this._ver
    };
  }
}

var result = new DataBuilder()
  .setVersion("1.0")
  .setId("11")
  .contact.setName("ali")
  .contact.setSurname("Tabryzy")
  .setDatetime(new Date())
  .build();
console.log(result);

(function () {
  var pre = document.createElement("pre");
  pre.textContent = JSON.stringify(result, null, 4);
  document.body.appendChild(pre);
})();
