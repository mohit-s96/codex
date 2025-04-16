declare module "keytar" {
  /**
   * Retrieves the stored password for the given service and account.
   * @param service The service name.
   * @param account The account name.
   * @returns The stored password, or null if not found.
   */
  export function getPassword(
    service: string,
    account: string,
  ): Promise<string | null>;

  /**
   * Sets the password for the given service and account.
   * @param service The service name.
   * @param account The account name.
   * @param password The password to store.
   */
  export function setPassword(
    service: string,
    account: string,
    password: string,
  ): Promise<void>;

  /**
   * Deletes the stored password for the given service and account.
   * @param service The service name.
   * @param account The account name.
   * @returns True if the password was deleted, false if there was no matching entry.
   */
  export function deletePassword(
    service: string,
    account: string,
  ): Promise<boolean>;

  const keytar: {
    getPassword(service: string, account: string): Promise<string | null>;
    setPassword(
      service: string,
      account: string,
      password: string,
    ): Promise<void>;
    deletePassword(service: string, account: string): Promise<boolean>;
  };
  export default keytar;
}
