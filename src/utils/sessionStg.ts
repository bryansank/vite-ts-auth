import { Utils } from "./utilsFn";

export type ValidServices = "spotify" | "twitter";

export class SessionUtils {
  private _utils?: Utils;

  get utils(): Utils {
    if (!this._utils) {
      this._utils = new Utils();
    }
    return this._utils;
  }

  private validString(str: string): boolean {
    if (str === " " || str === "" || str === "-") {
      return false;
    } else {
      return true;
    }
  }

  public getItem(key: string): string {
    try {
      if (!this.validString(key)) {
        throw new Error("Invalid string;");
      }

      const element: string | null = sessionStorage.getItem(key) || null;

      if (element === null) {
        // throw new Error(`The element ${key} don't exist`);
        return "";
      }

      return element;
    } catch (error) {
      console.error("Error in Session Utils");
      throw error;
    }
  }

  public setItem(
    key: string,
    value: any,
    getE: boolean = false
  ): string | void {
    try {
      if (!this.validString(key)) {
        throw new Error("Invalid string;");
      }

      let val: string = "";
      if (typeof value !== "string") {
        val = JSON.stringify(new Object(value));
      } else {
        val = value;
      }

      if (!this.validString(val)) {
        throw new Error("Invalid (value) to string;");
      }

      sessionStorage.setItem(key, val);

      if (getE) {
        return this.getItem(key);
      }
    } catch (error) {
      console.error("Error setting item");
      throw error;
    }
  }

  public deleteItem(key: string): void {
    try {
      if (!this.validString(key)) {
        throw new Error("Invalid string;");
      }

      sessionStorage.removeItem(key);
    } catch (error) {
      console.error("Error deleting item");
      throw error;
    }
  }

  public clearAllItems(): void {
    sessionStorage.clear();
  }

  public getAllItems(): string[] | [] {
    const l: number = sessionStorage.length;
    const arr: string[] = [];
    for (let i = 0; l; i++) {
      const vl: string | null = sessionStorage.key(l);
      if (vl !== null) {
        arr.push(vl);
      }
    }
    return arr;
  }

  public getTokenService(service: ValidServices): string {
    const token: string = this.getItem(`${service}_token_session`.trim()) || "";
    if (token === "") {
      console.log("Error, el token esta vacio");
    }
    return token;
  }

  public validateSessionLogged(service: ValidServices) {
    const validSessionExist: string =
      this.getItem(`${service}_logged`.trim()) || "";

    if (validSessionExist === "" || Boolean(validSessionExist) === false) {
      return this.utils.goToUrl("/");
    }
  }

  public validateHasServiceToken(service: ValidServices): boolean {
    const token: string = this.getItem(`${service}_token_session`.trim()) || "";
    if (token === "") {
      console.log("Don't have token or this is invalid");
      return false;
    } else {
      return true;
    }
  }
}
